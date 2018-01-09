package controllers.document.downloads.serializers

import java.io.File
import models.ContentType
import models.annotation.{ Annotation, AnnotationBody, AnnotationService }
import models.place.{ GazetteerRecord, Place, PlaceService }
import play.api.Logger
import scala.concurrent.ExecutionContext
import storage.{ ES, Uploads }
import models.document.DocumentInfo

trait BaseSerializer {
  
  protected val TMP_DIR = System.getProperty("java.io.tmpdir")

  private def sortByCharOffset(annotations: Seq[Annotation]) =
    annotations.sortWith { (a, b) =>
      a.anchor.substring(12).toInt < b.anchor.substring(12).toInt
    }

  private def sortByXY(annotations: Seq[Annotation]) =
    // TODO port nearest-neighbour sorting from Recogito v.1
    annotations
  
  private def sortByRow(annotations: Seq[Annotation]) =
    annotations.sortWith { (a, b) =>
      a.anchor.substring(4).toInt < b.anchor.substring(4).toInt
    }

  /** Attempts to sort annotations by a sane mechanism, depending on content type.
    *
    * By and large, we should be dealing with documents where all parts have the same
    * content type - but it's not guaranteed.
    */
  protected def sort(annotations: Seq[Annotation]) = {
    val groupedByContentType = annotations.groupBy(_.annotates.contentType)

    groupedByContentType.flatMap { case (cType, a) => cType match {
      case ContentType.TEXT_PLAIN => sortByCharOffset(a)
      case ContentType.IMAGE_UPLOAD | ContentType.IMAGE_IIIF => sortByXY(a)
      case ContentType.DATA_CSV => sortByRow(a)
      case _ => {
        Logger.warn(s"Can't sort annotations of unsupported content type $cType")
        a
      }
    }}
  }
  
  protected def getFirstQuote(a: Annotation): Option[String] = 
    a.bodies.find(_.hasType == AnnotationBody.QUOTE).flatMap(_.value)

  protected def getFirstTranscription(a: Annotation): Option[String] =
    a.bodies.find(_.hasType == AnnotationBody.TRANSCRIPTION).flatMap(_.value)

  protected def getFirstEntityBody(a: Annotation): Option[AnnotationBody] = {
    import AnnotationBody._
    a.bodies.find(b => b.hasType == PERSON || b.hasType == PLACE )
  }
  
  protected def getCommentBodies(a: Annotation): Seq[AnnotationBody] =
    a.bodies.filter(_.hasType == AnnotationBody.COMMENT)
    
  protected def getTagBodies(a: Annotation): Seq[AnnotationBody] =
    a.bodies.filter(_.hasType == AnnotationBody.TAG)
  
  protected def exportMergedDocument[T](
    doc: DocumentInfo,
    fn: (Seq[Annotation], Seq[Place], File) => T
  )(implicit placeService: PlaceService, annotationService: AnnotationService, uploads: Uploads, ctx: ExecutionContext) = {
    
    val fAnnotations = annotationService.findByDocId(doc.id, 0, ES.MAX_SIZE)
    val fPlaces = placeService.listPlacesInDocument(doc.id, 0, ES.MAX_SIZE)
    
    val f = for {
      annotations <- fAnnotations
      places <- fPlaces
    } yield (annotations.map(_._1), places.items.map(_._1))
    
    f.map { case (annotations, places) =>
      scala.concurrent.blocking {
        val documentDir = uploads.getDocumentDir(doc.owner.getUsername, doc.id).get
        fn(annotations, places, documentDir)
      }
    }
  }
    
}