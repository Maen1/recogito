package controllers.document.annotation

import controllers.{ AbstractController, Security }
import javax.inject.Inject
import jp.t2v.lab.play2.auth.AuthElement
import models.content.DocumentService
import models.user.Roles._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import storage.{ DB, FileAccess }

class TextAnnotationController @Inject() (implicit val db: DB) extends AbstractController with AuthElement with Security with FileAccess {

  def showAnnotationViewForDocPart(documentId: String, partNo: Int) = AsyncStack(AuthorityKey -> Normal) { implicit request =>
    val username = loggedIn.getUsername

    DocumentService.findByIdWithFileparts(documentId).map(_ match {
      case Some((document, fileparts)) => {
        // Verify if the user is allowed to access this document - TODO what about shared content?
        if (document.getOwner == username) {
          fileparts.find(_.getSequenceNo == partNo) match {
            case Some(filepart) => {
              loadTextfile(username, filepart.getFilename) match {
                case Some(content) =>
                  Ok(views.html.document.annotation.text(username, document, fileparts, filepart, content))

                case None => {
                  // Filepart found in DB, but not file on filesystem
                  InternalServerError
                }
              }
            }

            case None =>
              // No filepart with the specified sequence no
              NotFound
          }
        } else {
          Forbidden
        }
      }

      case None =>
        // No document with that ID found in DB
        NotFound
    })
  }

}
