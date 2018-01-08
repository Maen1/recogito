package controllers.document.settings.actions

import controllers.document.settings.SettingsController
import models.document.DocumentAccessLevel
import models.generated.tables.records.DocumentRecord
import models.user.Roles._
import play.api.mvc.{ AnyContent, Request }
import scala.concurrent.Future

trait DeleteActions { self: SettingsController =>
  
  protected def documentOwnerAction(docId: String, username: String, action: DocumentRecord => Future[Boolean]) = {
    documents.getDocumentRecord(docId, Some(username)).flatMap(_ match {
      case Some((document, accesslevel)) => {
        if (accesslevel == DocumentAccessLevel.OWNER) // We allow only the owner to delete a document
          action(document).map { success =>
            if (success) Ok else InternalServerError
          }
        else
          Future.successful(ForbiddenPage)
      }

      case None =>
        Future.successful(NotFoundPage) // No document with that ID found in DB
    }).recover { case t =>
      t.printStackTrace()
      InternalServerError(t.getMessage)
    }
  }

  /** Deletes all annotations on the document with the given ID **/
  def deleteAnnotations(docId: String) = AsyncStack(AuthorityKey -> Normal) { implicit request =>
    documentOwnerAction(docId, loggedIn.username, { document =>
      
      val deleteAnnotations = annotations.deleteByDocId(docId)
      val deleteContributions = contributions.deleteHistory(docId) 
        
      for {
        s1 <- deleteAnnotations
        s2 <- deleteContributions
      } yield (s1 && s2)
      
    })
  }

  /** Deletes the document with the given ID, along with all annotations and files **/
  def deleteDocument(docId: String) = AsyncStack(AuthorityKey -> Normal) { implicit request =>
    documentOwnerAction(docId, loggedIn.username, { document =>
            
      val deleteDocument = documents.delete(document)
      val deleteAnnotations = annotations.deleteByDocId(docId)
      val deleteContributions = contributions.deleteHistory(docId) 
      
      for {
        _ <- documents.delete(document)
        s1 <- deleteAnnotations
        s2 <- deleteContributions
      } yield (s1 && s2)
      
    })
  }

}
