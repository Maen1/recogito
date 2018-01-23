package services.entity.crosswalks.geojson

import com.vividsolutions.jts.geom.{Coordinate, GeometryFactory}
import services.HasGeometry
import org.joda.time.DateTime
import services.entity._
import play.api.libs.json._
import play.api.libs.functional.syntax._

object GeoNamesCrosswalk extends BaseGeoJSONCrosswalk {

  def fromJson(record: String): Option[EntityRecord] = super.fromJson[GeoNamesRecord](record, { geonames =>
    val (representativePoint, geometry) = {
      val reprPoint = geonames.representativePoint     
      val geometry = geonames.features.headOption.map(_.geometry)
      
      // Fill blanks if necessary
      (reprPoint, geometry) match {
        case (Some(c), Some(g)) => (Some(c), Some(g))
        case (Some(c), None) => (Some(c), Some(new GeometryFactory().createPoint(c))) 
        case (None, Some(g)) => (Some(g.getCentroid.getCoordinate), Some(g))
        case (None, None) => (None, None)
      }
    }
    
    EntityRecord(
      geonames.uri,
      "http://www.geonames.org",
      DateTime.now(),
      None, // lastChangedAt
      geonames.title,
      geonames.description.map(d => Seq(new Description(d))).getOrElse(Seq.empty[Description]),
      geonames.names,
      geometry, // TODO compute union?
      representativePoint,
      geonames.countryCode.map(c => CountryCode(c.toUpperCase)),
      None, // temporalBounds
      Seq.empty[String], // subjects
      geonames.population, // priority
      geonames.closeMatches.map(Link(_, LinkType.CLOSE_MATCH))
    )
  })

}

case class GeoNamesRecord(
  uri: String,
  title: String,
  description: Option[String],
  names: Seq[Name],
  features: Seq[Feature],
  representativePoint: Option[Coordinate],
  countryCode: Option[String],
  population: Option[Long],
  closeMatches: Seq[String])

object GeoNamesRecord extends HasGeometry {

  implicit val geonamesRecordReads: Reads[GeoNamesRecord] = (
    (JsPath \ "uri").read[String] and
    (JsPath \ "title").read[String] and
    (JsPath \ "description").readNullable[String] and
    (JsPath \ "names").readNullable[Seq[Name]].map(_.getOrElse(Seq.empty[Name])) and
    (JsPath \ "features").readNullable[Seq[Feature]].map(_.getOrElse(Seq.empty[Feature])) and
    (JsPath \ "reprPoint").readNullable[Coordinate] and
    (JsPath \ "country_code").readNullable[String] and
    (JsPath \ "population").readNullable[Long] and
    (JsPath \ "close_matches").readNullable[Seq[String]].map(_.getOrElse(Seq.empty[String]))
  )(GeoNamesRecord.apply _)

}
