// app.js

const postFeed = document.getElementById("postFeed");

// Post fetch + show with comments
firestore.collection("posts")
  .orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
    postFeed.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const postDiv = document.createElement("div");
      postDiv.className = "post-box";
      postDiv.innerHTML = `
        <div><b>${data.email}</b></div>
        <div>${data.caption}</div>
        <img src="${data.imageUrl}" alt="Post Image" style="max-width:100%; height:auto; margin-top:8px;" />

        <div id="comments-${doc.id}" class="comment-section"></div>
        
        <input type="text" id="commentInput-${doc.id}" placeholder="Comment লিখক..." />
        <button onclick="addComment('${doc.id}')">Comment কৰক</button>
      `;
      postFeed.appendChild(postDiv);

      // Load comments realtime
      firestore.collection("posts").doc(doc.id).collection("comments")
        .orderBy("createdAt")
        .onSnapshot(commentSnap => {
          const commentDiv = document.getElementById(`comments-${doc.id}`);
          if (!commentDiv) return;
          commentDiv.innerHTML = "";
          commentSnap.forEach(cDoc => {
            const c = cDoc.data();
            commentDiv.innerHTML += `<p><b>${c.email}:</b> ${c.comment}</p>`;
          });
        });
    });
  });

function addComment(postId) {
  const input = document.getElementById(`commentInput-${postId}`);
  const comment = input.value.trim();
  if (!comment) {
    alert("Comment লিখক");
    return;
  }

  auth.onAuthStateChanged(user => {
    if (!user) {
      alert("Login কৰক আগতে");
      return;
    }

    firestore.collection("posts").doc(postId).collection("comments").add({
      uid: user.uid,
      email: user.email,
      comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      input.value = "";
    }).catch(e => alert("Comment add কৰিব পৰা নগ'ল"));
  });
}