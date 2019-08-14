/**
 * This class is generated by jOOQ
 */
package services.generated


import java.util.ArrayList
import java.util.Arrays
import java.util.List

import javax.annotation.Generated

import org.jooq.Sequence
import org.jooq.Table
import org.jooq.impl.SchemaImpl

import services.generated.tables.AuthorityFile
import services.generated.tables.Document
import services.generated.tables.DocumentFilepart
import services.generated.tables.DocumentPreferences
import services.generated.tables.FeatureToggle
import services.generated.tables.Folder
import services.generated.tables.FolderAssociation
import services.generated.tables.ServiceAnnouncement
import services.generated.tables.SharingPolicy
import services.generated.tables.Similarity
import services.generated.tables.Task
import services.generated.tables.Upload
import services.generated.tables.UploadFilepart
import services.generated.tables.User
import services.generated.tables.UserRole


object Public {

	/**
	 * The reference instance of <code>public</code>
	 */
	val PUBLIC = new Public
}

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
class Public extends SchemaImpl("public") {

	override def getSequences : List[Sequence[_]] = {
		val result = new ArrayList[Sequence[_]]
		result.addAll(getSequences0)
		result
	}

	private def getSequences0() : List[Sequence[_]] = {
		return Arrays.asList[Sequence[_]](
			Sequences.FEATURE_TOGGLE_ID_SEQ,
			Sequences.SHARING_POLICY_ID_SEQ,
			Sequences.UPLOAD_ID_SEQ,
			Sequences.USER_ROLE_ID_SEQ)
	}

	override def getTables : List[Table[_]] = {
		val result = new ArrayList[Table[_]]
		result.addAll(getTables0)
		result
	}

	private def getTables0() : List[Table[_]] = {
		return Arrays.asList[Table[_]](
			AuthorityFile.AUTHORITY_FILE,
			Document.DOCUMENT,
			DocumentFilepart.DOCUMENT_FILEPART,
			DocumentPreferences.DOCUMENT_PREFERENCES,
			FeatureToggle.FEATURE_TOGGLE,
			Folder.FOLDER,
			FolderAssociation.FOLDER_ASSOCIATION,
			ServiceAnnouncement.SERVICE_ANNOUNCEMENT,
			SharingPolicy.SHARING_POLICY,
			Similarity.SIMILARITY,
			Task.TASK,
			Upload.UPLOAD,
			UploadFilepart.UPLOAD_FILEPART,
			User.USER,
			UserRole.USER_ROLE)
	}
}
