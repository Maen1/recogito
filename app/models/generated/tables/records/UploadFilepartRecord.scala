/**
 * This class is generated by jOOQ
 */
package models.generated.tables.records


import java.lang.Double
import java.lang.Integer
import java.lang.String

import javax.annotation.Generated

import models.generated.tables.UploadFilepart

import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record7
import org.jooq.Row7
import org.jooq.impl.UpdatableRecordImpl


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
class UploadFilepartRecord extends UpdatableRecordImpl[UploadFilepartRecord](UploadFilepart.UPLOAD_FILEPART) with Record7[Integer, Integer, String, String, String, String, Double] {

	/**
	 * Setter for <code>public.upload_filepart.id</code>.
	 */
	def setId(value : Integer) : Unit = {
		setValue(0, value)
	}

	/**
	 * Getter for <code>public.upload_filepart.id</code>.
	 */
	def getId : Integer = {
		val r = getValue(0)
		if (r == null) null else r.asInstanceOf[Integer]
	}

	/**
	 * Setter for <code>public.upload_filepart.upload_id</code>.
	 */
	def setUploadId(value : Integer) : Unit = {
		setValue(1, value)
	}

	/**
	 * Getter for <code>public.upload_filepart.upload_id</code>.
	 */
	def getUploadId : Integer = {
		val r = getValue(1)
		if (r == null) null else r.asInstanceOf[Integer]
	}

	/**
	 * Setter for <code>public.upload_filepart.owner</code>.
	 */
	def setOwner(value : String) : Unit = {
		setValue(2, value)
	}

	/**
	 * Getter for <code>public.upload_filepart.owner</code>.
	 */
	def getOwner : String = {
		val r = getValue(2)
		if (r == null) null else r.asInstanceOf[String]
	}

	/**
	 * Setter for <code>public.upload_filepart.title</code>.
	 */
	def setTitle(value : String) : Unit = {
		setValue(3, value)
	}

	/**
	 * Getter for <code>public.upload_filepart.title</code>.
	 */
	def getTitle : String = {
		val r = getValue(3)
		if (r == null) null else r.asInstanceOf[String]
	}

	/**
	 * Setter for <code>public.upload_filepart.content_type</code>.
	 */
	def setContentType(value : String) : Unit = {
		setValue(4, value)
	}

	/**
	 * Getter for <code>public.upload_filepart.content_type</code>.
	 */
	def getContentType : String = {
		val r = getValue(4)
		if (r == null) null else r.asInstanceOf[String]
	}

	/**
	 * Setter for <code>public.upload_filepart.filename</code>.
	 */
	def setFilename(value : String) : Unit = {
		setValue(5, value)
	}

	/**
	 * Getter for <code>public.upload_filepart.filename</code>.
	 */
	def getFilename : String = {
		val r = getValue(5)
		if (r == null) null else r.asInstanceOf[String]
	}

	/**
	 * Setter for <code>public.upload_filepart.filesize_kb</code>.
	 */
	def setFilesizeKb(value : Double) : Unit = {
		setValue(6, value)
	}

	/**
	 * Getter for <code>public.upload_filepart.filesize_kb</code>.
	 */
	def getFilesizeKb : Double = {
		val r = getValue(6)
		if (r == null) null else r.asInstanceOf[Double]
	}

	// -------------------------------------------------------------------------
	// Primary key information
	// -------------------------------------------------------------------------
	override def key() : Record1[Integer] = {
		return super.key.asInstanceOf[ Record1[Integer] ]
	}

	// -------------------------------------------------------------------------
	// Record7 type implementation
	// -------------------------------------------------------------------------

	override def fieldsRow : Row7[Integer, Integer, String, String, String, String, Double] = {
		super.fieldsRow.asInstanceOf[ Row7[Integer, Integer, String, String, String, String, Double] ]
	}

	override def valuesRow : Row7[Integer, Integer, String, String, String, String, Double] = {
		super.valuesRow.asInstanceOf[ Row7[Integer, Integer, String, String, String, String, Double] ]
	}
	override def field1 : Field[Integer] = UploadFilepart.UPLOAD_FILEPART.ID
	override def field2 : Field[Integer] = UploadFilepart.UPLOAD_FILEPART.UPLOAD_ID
	override def field3 : Field[String] = UploadFilepart.UPLOAD_FILEPART.OWNER
	override def field4 : Field[String] = UploadFilepart.UPLOAD_FILEPART.TITLE
	override def field5 : Field[String] = UploadFilepart.UPLOAD_FILEPART.CONTENT_TYPE
	override def field6 : Field[String] = UploadFilepart.UPLOAD_FILEPART.FILENAME
	override def field7 : Field[Double] = UploadFilepart.UPLOAD_FILEPART.FILESIZE_KB
	override def value1 : Integer = getId
	override def value2 : Integer = getUploadId
	override def value3 : String = getOwner
	override def value4 : String = getTitle
	override def value5 : String = getContentType
	override def value6 : String = getFilename
	override def value7 : Double = getFilesizeKb

	override def value1(value : Integer) : UploadFilepartRecord = {
		setId(value)
		this
	}

	override def value2(value : Integer) : UploadFilepartRecord = {
		setUploadId(value)
		this
	}

	override def value3(value : String) : UploadFilepartRecord = {
		setOwner(value)
		this
	}

	override def value4(value : String) : UploadFilepartRecord = {
		setTitle(value)
		this
	}

	override def value5(value : String) : UploadFilepartRecord = {
		setContentType(value)
		this
	}

	override def value6(value : String) : UploadFilepartRecord = {
		setFilename(value)
		this
	}

	override def value7(value : Double) : UploadFilepartRecord = {
		setFilesizeKb(value)
		this
	}

	override def values(value1 : Integer, value2 : Integer, value3 : String, value4 : String, value5 : String, value6 : String, value7 : Double) : UploadFilepartRecord = {
		this.value1(value1)
		this.value2(value2)
		this.value3(value3)
		this.value4(value4)
		this.value5(value5)
		this.value6(value6)
		this.value7(value7)
		this
	}

	/**
	 * Create a detached, initialised UploadFilepartRecord
	 */
	def this(id : Integer, uploadId : Integer, owner : String, title : String, contentType : String, filename : String, filesizeKb : Double) = {
		this()

		setValue(0, id)
		setValue(1, uploadId)
		setValue(2, owner)
		setValue(3, title)
		setValue(4, contentType)
		setValue(5, filename)
		setValue(6, filesizeKb)
	}
}
