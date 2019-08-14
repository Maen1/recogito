/**
 * This class is generated by jOOQ
 */
package services.generated.tables.records


import java.lang.Double
import java.lang.String

import javax.annotation.Generated

import org.jooq.Field
import org.jooq.Record2
import org.jooq.Record4
import org.jooq.Row4
import org.jooq.impl.UpdatableRecordImpl

import services.generated.tables.Similarity


/**
 * This class is generated by jOOQ.
 */
@Generated(
	value = Array(
		"http://www.jooq.org",
		"jOOQ version:3.7.2"
	),
	comments = "This class is generated by jOOQ"
)
class SimilarityRecord extends UpdatableRecordImpl[SimilarityRecord](Similarity.SIMILARITY) with Record4[String, String, Double, Double] {

	/**
	 * Setter for <code>public.similarity.doc_id_a</code>.
	 */
	def setDocIdA(value : String) : Unit = {
		setValue(0, value)
	}

	/**
	 * Getter for <code>public.similarity.doc_id_a</code>.
	 */
	def getDocIdA : String = {
		val r = getValue(0)
		if (r == null) null else r.asInstanceOf[String]
	}

	/**
	 * Setter for <code>public.similarity.doc_id_b</code>.
	 */
	def setDocIdB(value : String) : Unit = {
		setValue(1, value)
	}

	/**
	 * Getter for <code>public.similarity.doc_id_b</code>.
	 */
	def getDocIdB : String = {
		val r = getValue(1)
		if (r == null) null else r.asInstanceOf[String]
	}

	/**
	 * Setter for <code>public.similarity.title_jaro_winkler</code>.
	 */
	def setTitleJaroWinkler(value : Double) : Unit = {
		setValue(2, value)
	}

	/**
	 * Getter for <code>public.similarity.title_jaro_winkler</code>.
	 */
	def getTitleJaroWinkler : Double = {
		val r = getValue(2)
		if (r == null) null else r.asInstanceOf[Double]
	}

	/**
	 * Setter for <code>public.similarity.entity_jaccard</code>.
	 */
	def setEntityJaccard(value : Double) : Unit = {
		setValue(3, value)
	}

	/**
	 * Getter for <code>public.similarity.entity_jaccard</code>.
	 */
	def getEntityJaccard : Double = {
		val r = getValue(3)
		if (r == null) null else r.asInstanceOf[Double]
	}

	// -------------------------------------------------------------------------
	// Primary key information
	// -------------------------------------------------------------------------
	override def key() : Record2[String, String] = {
		return super.key.asInstanceOf[ Record2[String, String] ]
	}

	// -------------------------------------------------------------------------
	// Record4 type implementation
	// -------------------------------------------------------------------------

	override def fieldsRow : Row4[String, String, Double, Double] = {
		super.fieldsRow.asInstanceOf[ Row4[String, String, Double, Double] ]
	}

	override def valuesRow : Row4[String, String, Double, Double] = {
		super.valuesRow.asInstanceOf[ Row4[String, String, Double, Double] ]
	}
	override def field1 : Field[String] = Similarity.SIMILARITY.DOC_ID_A
	override def field2 : Field[String] = Similarity.SIMILARITY.DOC_ID_B
	override def field3 : Field[Double] = Similarity.SIMILARITY.TITLE_JARO_WINKLER
	override def field4 : Field[Double] = Similarity.SIMILARITY.ENTITY_JACCARD
	override def value1 : String = getDocIdA
	override def value2 : String = getDocIdB
	override def value3 : Double = getTitleJaroWinkler
	override def value4 : Double = getEntityJaccard

	override def value1(value : String) : SimilarityRecord = {
		setDocIdA(value)
		this
	}

	override def value2(value : String) : SimilarityRecord = {
		setDocIdB(value)
		this
	}

	override def value3(value : Double) : SimilarityRecord = {
		setTitleJaroWinkler(value)
		this
	}

	override def value4(value : Double) : SimilarityRecord = {
		setEntityJaccard(value)
		this
	}

	override def values(value1 : String, value2 : String, value3 : Double, value4 : Double) : SimilarityRecord = {
		this.value1(value1)
		this.value2(value2)
		this.value3(value3)
		this.value4(value4)
		this
	}

	/**
	 * Create a detached, initialised SimilarityRecord
	 */
	def this(docIdA : String, docIdB : String, titleJaroWinkler : Double, entityJaccard : Double) = {
		this()

		setValue(0, docIdA)
		setValue(1, docIdB)
		setValue(2, titleJaroWinkler)
		setValue(3, entityJaccard)
	}
}
