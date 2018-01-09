package controllers.admin.backup

import akka.actor.ActorSystem
import controllers.BaseAuthController
import javax.inject.{ Inject, Singleton }
import models.ContentType
import models.annotation.AnnotationService
import models.document.DocumentService
import models.generated.tables.records.DocumentFilepartRecord
import models.user.UserService
import models.user.Roles._
import org.webjars.play.WebJarsUtil
import play.api.Configuration
import play.api.mvc.ControllerComponents
import scala.concurrent.{ ExecutionContext, Future }
import transform.tiling.TilingService

@Singleton
class BackupAdminController @Inject() (
    val components: ControllerComponents,
    val config: Configuration,
    val users: UserService,
    implicit val tilingService: TilingService,
    implicit val annotations: AnnotationService,
    implicit val documents: DocumentService,
    implicit val ctx: ExecutionContext,
    implicit val system: ActorSystem,
    implicit val webJarsUtil: WebJarsUtil
  ) extends BaseAuthController(components, config, documents, users) /* with BackupReader */ {
  
  def index = play.api.mvc.Action { Ok } /*StackAction(AuthorityKey -> Admin) { implicit request => 
    Ok(views.html.admin.backup.index())
  }*/
  
  def restore = play.api.mvc.Action { Ok } /* AsyncStack(AuthorityKey -> Admin) { implicit request =>
    
    request.body.asMultipartFormData.flatMap(_.file("backup")) match {
      case Some(formData) =>
        restoreBackup(formData.ref.file, runAsAdmin = true, forcedOwner = None).map { case (doc, fileparts) =>          
          Redirect(routes.BackupAdminController.index)
        }.recover { case t: Throwable =>
          t.printStackTrace()
          InternalServerError
        }
        
      case None => 
        Future.successful(BadRequest)
    }
    
  }*/
  
}