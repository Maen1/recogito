package models.place

import com.vividsolutions.jts.geom.{ Coordinate, GeometryFactory }
import java.io.{ File, FileInputStream }
import services.geotag.GeoTagStore
import org.joda.time.DateTime
import org.specs2.mutable._
import org.specs2.runner._
import org.junit.runner._
import play.api.Logger
import play.api.test._
import play.api.test.Helpers._
import play.api.inject.guice.GuiceApplicationBuilder
import scala.concurrent.{Await, ExecutionContext}
import scala.concurrent.duration._
import services.place.crosswalks.PelagiosRDFCrosswalk

// So we can instantiate a PlaceService running on a mock store
class TestPlaceService extends MockPlaceStore with PlaceImporter with GeoTagStore

@RunWith(classOf[JUnitRunner])
class PlaceServiceSpec extends Specification {
  
  // Force Specs2 to execute tests in sequential order
  sequential 
  
  val application = GuiceApplicationBuilder().build()
  implicit val executionContext = application.injector.instanceOf[ExecutionContext]
  
  private val DARE_RDF = new File("test/resources/models/place/gazetteer_sample_dare.ttl")
  
  private val PLEIADES_RDF = new File("test/resources/models/place/gazetteer_sample_pleiades.ttl")
  
  val testPlaceService = new TestPlaceService()
  
  /** Async Await shorthands **/
  private def importRecords(records: Seq[GazetteerRecord]): Seq[GazetteerRecord] =
    Await.result(testPlaceService.importRecords(records), 10 seconds)
  
  private def findByURI(uri: String): Place =
    Await.result(testPlaceService.findByURI(uri), 10 seconds).get._1
    
  private def getTotalPlaces(): Long =
    Await.result(testPlaceService.totalPlaces(), 10 seconds)
  
  "The conflate method" should {
    
    "properly merge 3 test records that should be joined" in {
      val recordA = GazetteerRecord("http://www.example.com/place/a", Gazetteer("Gazetteer A"), DateTime.now(),
        None, "Record A", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String],
        None, None,
        Seq("http://www.example.com/place/b"),
        Seq.empty[String])
        
      val recordB = GazetteerRecord("http://www.example.com/place/b", Gazetteer("Gazetteer B"), DateTime.now(),
        None, "Record B", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String], 
        None, None,
        Seq.empty[String], Seq.empty[String])

      val recordC = GazetteerRecord("http://www.example.com/place/c", Gazetteer("Gazetteer C"), DateTime.now(),
        None, "Record C", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String],
        None, None,
        Seq("http://www.example.com/place/a"),
        Seq("http://www.example.com/place/b"))
        
      val conflated = testPlaceService.conflate(Seq(recordA, recordB, recordC))
      conflated.size must equalTo(1)
      conflated.head.id must equalTo(recordA.uri)
      conflated.head.isConflationOf.size must equalTo(3)
    }
    
    "properly separate 3 records that should remain speparate" in {
      val recordA = GazetteerRecord("http://www.example.com/place/a", Gazetteer("Gazetteer A"), DateTime.now(),
        None, "Record A", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String], 
        None, None,
        Seq("http://www.example.com/place/d"),
        Seq.empty[String])
        
      val recordB = GazetteerRecord("http://www.example.com/place/b", Gazetteer("Gazetteer B"), DateTime.now(),
        None, "Record B", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String], 
        None, None,
        Seq.empty[String], Seq.empty[String])

      val recordC = GazetteerRecord("http://www.example.com/place/c", Gazetteer("Gazetteer C"), DateTime.now(),
        None, "Record C", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String], 
        None, None,
        Seq("http://www.example.com/place/e"),
        Seq("http://www.example.com/place/f"))
        
      val conflated = testPlaceService.conflate(Seq(recordA, recordB, recordC))
      conflated.size must equalTo(3)
      conflated.map(_.id) must containAllOf(Seq(recordA.uri, recordB.uri, recordC.uri))
      conflated.map(_.isConflationOf.size) must equalTo(Seq(1, 1, 1))
    }
    
    "properly conflate 3 records into 2 groups of 1 and 2 places" in {
      val recordA = GazetteerRecord("http://www.example.com/place/a", Gazetteer("Gazetteer A"), DateTime.now(),
        None, "Record A", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String],
        None, None,
        Seq("http://www.example.com/place/d"),
        Seq.empty[String])
        
      val recordB = GazetteerRecord("http://www.example.com/place/b", Gazetteer("Gazetteer B"), DateTime.now(),
        None, "Record B", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String], 
        None, None,
        Seq.empty[String], Seq.empty[String])

      val recordC = GazetteerRecord("http://www.example.com/place/c", Gazetteer("Gazetteer C"), DateTime.now(),
        None, "Record C", Seq.empty[Description], Seq.empty[Name], None, None, None, Seq.empty[String],
        None, None,
        Seq("http://www.example.com/place/e"),
        Seq("http://www.example.com/place/a"))
        
      val conflated = testPlaceService.conflate(Seq(recordA, recordB, recordC))
      
      conflated.size must equalTo(2)
      conflated.map(_.id) must containAllOf(Seq(recordA.uri, recordB.uri))
    }
    
  }
  
  "After importing the DARE sample, the PlaceService" should {
    
    val dareRecords = PelagiosRDFCrosswalk.readFile(DARE_RDF)
    
    "contain 4 places" in {
      // This mostly tests the mock impl - but probably doesn't hurt & is consistent the integration spec
      val failedRecords = importRecords(dareRecords)
      failedRecords.size must equalTo(0)
      getTotalPlaces() must equalTo(4)
    }
    
    "return DARE places based on their URI" in {
      // Except for URI normalization this mostly tests the mock impl - but see above
      val barcelona = findByURI("http://dare.ht.lu.se/places/6534")
      barcelona.titles must containAllOf(Seq("Col. Barcino, Barcelona"))
      
      val vindobona = findByURI("http://dare.ht.lu.se/places/10783")
      vindobona.titles must containAllOf(Seq("Mun. Vindobona, Wien"))
      
      val thessaloniki = findByURI("http://dare.ht.lu.se/places/17068")
      thessaloniki.titles must containAllOf(Seq("Thessalonica, Thessaloniki"))
          
      val lancaster = findByURI("http://dare.ht.lu.se/places/23712")
      lancaster.titles must containAllOf(Seq("Calunium?, Lancaster"))      
    }
    
  }
  
  "Based on the fictitious sample record, getAffectedPlaces" should {
    
    "return Vindobona, Thessalonica and Calunium" in {
      val fakeVindobona = GazetteerRecord(
        "http://www.wikidata.org/entity/Q871525/", // This will cause DARE's Vindobona to match
        Gazetteer("DummyGazetteer"),
        DateTime.now(),
        None,
        "A fake place",
        Seq.empty[Description],
        Seq.empty[Name],
        None,
        None,
        None,
        Seq.empty[String],
        None,
        None,
        Seq("http://dare.ht.lu.se/places/17068/"), // This will match DARE's Thessalonica
        Seq("http://www.trismegistos.org/place/15045/")) // This is a common match with DARE's Calunium
      
      val expectedPlaceURIs = Seq(
        "http://dare.ht.lu.se/places/10783",
        "http://dare.ht.lu.se/places/17068",
        "http://dare.ht.lu.se/places/23712")
                
      val affectedPlaces = Await.result(testPlaceService.getAffectedPlaces(fakeVindobona), 10 seconds)
      affectedPlaces.size must equalTo(3)
      affectedPlaces.map(_._1.id) must containAllOf(expectedPlaceURIs)
    }
    
  }
  
  "After importing the Pleiades sample, the PlaceService" should {
    
    val pleiadesRecords = PelagiosRDFCrosswalk.readFile(PLEIADES_RDF)
      
    "contain 5 places" in {
      val failedRecords = importRecords(pleiadesRecords)
      failedRecords.size must equalTo(0)
      getTotalPlaces() must equalTo(5)
    }
    
    "return the places by any URI - DARE or Pleiades" in { 
      val barcelonaDARE = findByURI("http://dare.ht.lu.se/places/6534")
      val barcelonaPleiades = findByURI("http://pleiades.stoa.org/places/246343")
      barcelonaDARE must equalTo(barcelonaPleiades)
      
      val vindobonaDARE = findByURI("http://dare.ht.lu.se/places/10783")
      val vindobonaPleiades = findByURI("http://pleiades.stoa.org/places/128460")
      vindobonaDARE must equalTo(vindobonaPleiades)
      
      val thessalonikiDARE = findByURI("http://dare.ht.lu.se/places/17068")
      val thessalonikiPleiades = findByURI("http://pleiades.stoa.org/places/491741")
      thessalonikiDARE must equalTo(thessalonikiPleiades)
          
      val lancasterDARE = findByURI("http://dare.ht.lu.se/places/23712")
      val lancasterPleiades = findByURI("http://pleiades.stoa.org/places/89222")
      lancasterDARE must equalTo(lancasterPleiades)
      
      // This record only exists in the Pleiades sample, not the DARE one - just check if it's there
      try {
        findByURI("http://pleiades.stoa.org/places/128537")
        success
      } catch { case t: Throwable => 
        failure
      }
    }
    
    "retain the original title from DARE" in { 
      val barcelonaPleiades = findByURI("http://pleiades.stoa.org/places/246343")
      barcelonaPleiades.titles must containAllOf(Seq("Col. Barcino, Barcelona"))
      
      val vindobonaPleiades = findByURI("http://pleiades.stoa.org/places/128460")
      vindobonaPleiades.titles must containAllOf(Seq("Mun. Vindobona, Wien"))
      
      val thessalonikiPleiades = findByURI("http://pleiades.stoa.org/places/491741")
      thessalonikiPleiades.titles must containAllOf(Seq("Thessalonica, Thessaloniki"))
          
      val lancasterPleiades = findByURI("http://pleiades.stoa.org/places/89222")
      lancasterPleiades.titles must containAllOf(Seq("Calunium?, Lancaster"))
    }
    
    "have properly conflated the sample place Vindobona (pleiades:128460)" in {
      val vindobona = findByURI("http://pleiades.stoa.org/places/128460")
     
      val coordDARE = new Coordinate(16.391128, 48.193161)
      val pointDARE = new GeometryFactory().createPoint(coordDARE)
            
      vindobona.representativeGeometry must equalTo(Some(pointDARE))
      vindobona.representativePoint must equalTo(Some(coordDARE))
      
      val expectedDescriptions = Seq(
        Description("An ancient place, cited: BAtlas 13 B4 Mun. Vindobona"),
        Description("Ancient city Mun. Vindobona, modern Wien. Gemeinde Wien, Bezirk Wien, AT"))
        
      vindobona.descriptions.size must equalTo(2)
      vindobona.descriptions.keys must containAllOf(expectedDescriptions)
      
      vindobona.placeTypes.keys must equalTo(Seq("SETTLEMENT"))      
      vindobona.temporalBoundsUnion must equalTo(Some(TemporalBounds.fromYears(-30, 640)))
      
      vindobona.names.size must equalTo(6)
            
      vindobona.names.get(Name("Mun. Vindobona")).get must equalTo(Seq(Gazetteer("gazetteer_sample_pleiades")))
      vindobona.names.get(Name("Mun. Vindobona", Some("la"))).get must equalTo(Seq(Gazetteer("gazetteer_sample_dare")))
      vindobona.names.get(Name("Wien")).get must containAllOf(Seq(Gazetteer("gazetteer_sample_pleiades"), Gazetteer("gazetteer_sample_dare")))
      vindobona.names.get(Name("Wien/Vienna AUS")).get must equalTo(Seq(Gazetteer("gazetteer_sample_pleiades")))
      vindobona.names.get(Name("Vienne", Some("fr"))).get must equalTo(Seq(Gazetteer("gazetteer_sample_dare")))
      vindobona.names.get(Name("Vienna", Some("en"))).get must equalTo(Seq(Gazetteer("gazetteer_sample_dare")))

      val expectedCloseMatches = Seq("http://www.wikidata.org/entity/Q871525")
      val expectedExactMatches = Seq(
          "http://pleiades.stoa.org/places/128460",
          "http://www.trismegistos.org/place/28821")

      vindobona.closeMatches must equalTo(expectedCloseMatches)
      vindobona.exactMatches must containAllOf(expectedExactMatches)
      
      vindobona.isConflationOf.size must equalTo(2)
      
      val pleiadesRecord = vindobona.isConflationOf.find(_.uri == "http://pleiades.stoa.org/places/128460").get
      
      val coordPleiades = new Coordinate(16.373064, 48.208982)
      val pointPleiades = new GeometryFactory().createPoint(coordPleiades)
      pleiadesRecord.geometry must equalTo(Some(pointPleiades))
      pleiadesRecord.representativePoint must equalTo(Some(coordPleiades))
    }
    
  }
  
  "After adding a 'bridiging' record that connects two places, the PlaceService" should {
    
    "contain one place less" in {
      // A fictitious record connecting the two Vindobonas
      val fakeMeidling = GazetteerRecord(
        "http://de.wikipedia.org/wiki/Meidling",
        Gazetteer("DummyGazetteer"),
        DateTime.now(),
        None,
        "A fake briding place",
        Seq.empty[Description],
        Seq.empty[Name],
        None,
        None,
        None,
        Seq.empty[String],
        None,
        None,
        Seq("http://pleiades.stoa.org/places/128460"), // Mun. Vindobona
        Seq("http://pleiades.stoa.org/places/128537")) // Vindobona
      
      importRecords(Seq(fakeMeidling))
      getTotalPlaces() must equalTo(4)
    }
    
    "have properly conflated the successor place" in {
      val conflated = findByURI("http://dare.ht.lu.se/places/10783")
      conflated.id must equalTo("http://dare.ht.lu.se/places/10783")
      
      val expectedURIs = Seq(
        "http://de.wikipedia.org/wiki/Meidling",
        "http://dare.ht.lu.se/places/10783",
        "http://pleiades.stoa.org/places/128460", // Mun. Vindobona
        "http://pleiades.stoa.org/places/128537") // Vindobona
      conflated.isConflationOf.size must equalTo(4)   
      conflated.uris must containAllOf(expectedURIs)
    }
    
  }
  
  "After updating the bridge record, the PlaceService" should {
    
    "contain two places more" in {
      // Update our fictitious record, so that it no longer connects the two Vindobonas
      val fakeMeidling = GazetteerRecord(
        "http://de.wikipedia.org/wiki/Meidling",
        Gazetteer("DummyGazetteer"),
        DateTime.now(),
        None,
        "A fake briding place",
        Seq.empty[Description],
        Seq.empty[Name],
        None,
        None,
        None,
        Seq.empty[String],
        None,
        None,
        Seq.empty[String], 
        Seq.empty[String])
       
      importRecords(Seq(fakeMeidling))
      getTotalPlaces() must equalTo(6)
    }
    
    "should contain 3 properly conflated successor places (2 original Vindobonas and dummy Meidling record)" in {
      val munVindobona = findByURI("http://dare.ht.lu.se/places/10783")
      munVindobona.id must equalTo("http://dare.ht.lu.se/places/10783")
      munVindobona.isConflationOf.size must equalTo(2)
      munVindobona.uris must containAllOf(Seq("http://dare.ht.lu.se/places/10783", "http://pleiades.stoa.org/places/128460"))
      
      val vindobona = findByURI("http://pleiades.stoa.org/places/128537")
      vindobona.isConflationOf.map(_.uri) must equalTo(Seq("http://pleiades.stoa.org/places/128537"))
      
      val fakeMeidling = findByURI("http://de.wikipedia.org/wiki/Meidling")
      fakeMeidling.isConflationOf.map(_.uri) must equalTo(Seq("http://de.wikipedia.org/wiki/Meidling"))
    }
    
  }
  
}