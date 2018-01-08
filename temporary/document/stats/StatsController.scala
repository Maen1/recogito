package controllers.document.stats

import controllers.BaseAuthController
import javax.inject.{ Inject, Singleton }
import models.document.DocumentService
import models.user.UserService
import models.user.Roles._
import org.webjars.play.WebJarsUtil
import play.api.Configuration
import scala.concurrent.ExecutionContext

@Singleton
class StatsController @Inject() (
    val config: Configuration,
    val documents: DocumentService,
    val users: UserService,
    implicit val webjars: WebJarsUtil,
    implicit val ctx: ExecutionContext
  ) extends BaseAuthController(config, documents, users) {

  /** TODO this view should be available without login, if the document is set to public **/
  def showDocumentStats(documentId: String) = AsyncStack(AuthorityKey -> Normal) { implicit request =>
    documentResponse(documentId, loggedIn,{ case (doc, accesslevel) => 
      Ok(views.html.document.stats.index(doc, Some(loggedIn), accesslevel)) })
  }

}
