window.shareDoc = async () => {
  const familyMemberId = document.getElementById("familyMemberId").value.trim();
  
  // Validate input
  if (!familyMemberId) {
    showError("Family member ID cannot be empty");
    return;
  }

  try {
    // Verify family member exists
    const memberDoc = await db.collection("users").doc(familyMemberId).get();
    if (!memberDoc.exists) {
      throw new Error("User not found");
    }

    // Get selected document
    const docId = document.getElementById("doc-selector").value;
    if (!docId) {
      throw new Error("No document selected");
    }

    // Update Firestore
    await db.collection("users").doc(auth.currentUser.uid)
      .collection("documents").doc(docId)
      .update({
        sharedWith: firebase.firestore.FieldValue.arrayUnion(familyMemberId),
        lastShared: firebase.firestore.FieldValue.serverTimestamp()
      });

    // Audit log
    await db.collection("audit_logs").add({
      action: "document_share",
      userId: auth.currentUser.uid,
      targetUser: familyMemberId,
      docId: docId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    showSuccess("Document shared successfully!");
    
  } catch (error) {
    showError(`Sharing failed: ${error.message}`);
    console.error("Sharing error:", error);
  }
};