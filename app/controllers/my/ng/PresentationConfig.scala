package controllers.my.ng

import play.api.libs.json._
import play.api.libs.functional.syntax._

object SortOrder extends Enumeration {
  type Order = Value
  val ASC, DESC = Value
}

case class Sorting(sortBy: String, order: SortOrder.Order)

object Sorting {

  implicit val sortingReads: Reads[Sorting] = (
    (JsPath \ "sort_by").read[String] and
    (JsPath \ "order").read[String].map(SortOrder.withName)
  )(Sorting.apply _)

}

case class PresentationConfig(columns: Seq[String], sort: Sorting)

object PresentationConfig {

  implicit val presentationConfigReads: Reads[PresentationConfig] = (
    (JsPath \ "columns").readNullable[Seq[String]] and
    (JsPath \ "sort").readNullable[Sorting]
  )(PresentationConfig.apply _)

}