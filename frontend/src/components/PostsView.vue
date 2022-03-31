<template>
  <v-card max-width="800" class="mx-auto">
    <main class="activities-container">
      <div class="form-container">
        <v-toolbar class="red lighten-4">
          <v-toolbar-title>Créer une nouvelle publication</v-toolbar-title>
        </v-toolbar>
        <v-col md="6" offset-md="3">
          <form @submit.prevent="newPost">
            <div class="form-group">
              <label for="content"></label>
              <input
                type="textarea"
                name="content"
                id="content"
                placeholder="Ecrire quelque chose..."
                required
                maxlength="300"
              />
            </div>
            <div class="form-group">
              <label for="image"></label>
              <input
                type="text"
                name="image"
                id="imagePost"
                placeholder="(Optionnel) L'url d'une image ou d'un GIF à partager"
              />
            </div>
            <div class="form-group">
              <button type="submit">POST</button>
            </div>
          </form>
        </v-col>
      </div>
      <div class="error-msg" v-if="postErr || commentErr">
        <p>{{ postErr }}</p>
        <p>{{ commentErr }}</p>
      </div>
      <br />
      <section class="all-posts-container">
        <div class="post-container" v-for="post in posts" :key="post.id">
          <div class="infos">
            <div class="author">
              <a
                href="#"
                class="anchorCoworker"
                @click.prevent="goToCoworker(post.userId)"
              >
                <p class="username">{{ post.prenom }} {{ post.nom }}</p>
              </a>
            </div>
            <div class="dateDelete">
              <p class="date">
                {{ post.date.slice(0, 16).replace("T", " / ") }}
              </p>
              <div
                @click="deletePost(post.id)"
                class="deleteIcon"
                v-if="user.userId == post.userId || user.userId == 1"
              >
                <v-icon> mdi-delete </v-icon>
              </div>
            </div>
          </div>
          <div class="content">
            <div
              class="postPict"
              v-if="post.image"
              :style="{ backgroundImage: 'url(' + post.image + ')' }"
            ></div>
            <p>
              {{ post.content }}
            </p>
            <v-btn
              class="commentBtn"
              elevation="2"
              @click="showComment(post.id)"
              >Commenter</v-btn
            >
            <form v-show="yesBtn" @submit.prevent="newComment(post.id)">
              <div class="form-comment">
                <label for="contentComment"></label>
                <input
                  type="textarea"
                  name="contentComment"
                  class="contentComment"
                  placeholder="Ecrire un commentaire"
                  maxlength="100"
                  v-model="contentComment"
                />
                <div class="form-group">
                  <button type="submit">Post</button>
                </div>
              </div>
            </form>
          </div>
          <div class="commentStructure">
            <div
              class="comment-container"
              v-for="comment in filterComments(post.id)"
              :key="comment.id"
            >
              <div class="comment-infos">
                <a
                  href="#"
                  class="anchorCoworker"
                  @click.prevent="goToCoworker(comment.userId)"
                >
                  <p class="comment-username">
                    {{ comment.prenom }} {{ comment.nom }}
                  </p>
                </a>
                <div class="dateDelete">
                  <p class="date">
                    {{ comment.date.slice(0, 16).replace("T", " / ") }}
                  </p>
                  <div
                    @click="deleteComment(comment.id)"
                    class="deleteIcon"
                    v-if="user.userId == comment.userId || user.userId == 1"
                  >
                    <v-icon> mdi-delete </v-icon>
                  </div>
                </div>
              </div>
              <div class="comment-content">
                <p>
                  {{ comment.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </v-card>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "PostsView",
  components: {},
  data: function () {
    return {
      yesBtn: false,
      postId: "",
      users: [],
      contentComment: "",
      profile: false,
      loading: false,
      posts: [],
      comments: [],
      activities: [],
      postContent: "",
      postFile: "",
      postErr: "",
      commentErr: "",
      commentOK: false,
    };
  },
  methods: {
    //COMMENT
    filterComments(idPost) {
      return this.comments.filter((comment) => comment.postId == idPost);
    },
    showComment() {
      return (this.yesBtn = !this.yesBtn);
    },
    //Go to co-worker profile
    goToCoworker(id) {
      let local = JSON.parse(localStorage.user);
      let token = local.token;
      axios
        .get("http://localhost:3000/auth/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          let resultat = res.data;
          const nom = resultat[0].nom;
          const prenom = resultat[0].prenom;
          const email = resultat[0].email;
          const image = resultat[0].image;
          const bio = resultat[0].bio;
          let coworker = { nom, prenom, email, image, bio };
          localStorage.setItem("coworker", JSON.stringify(coworker));
          location.href = "http://localhost:8080/#/coworker";
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    //POST a new post
    newPost(event) {
      const { content, image } = Object.fromEntries(new FormData(event.target));
      let local = JSON.parse(localStorage.user);
      let userId = local.userId;
      let prenom = local.prenom;
      let nom = local.nom;
      let date = Date.now();
      let imageProfile = local.imageProfile;
      this.content = content;
      this.image = image;
      axios({
        method: "post",
        url: "http://localhost:3000/posts",
        data: { userId, content, image, prenom, nom, date, imageProfile },
        headers: { "Content-Type": "application/json" },
      })
        .then((reponse) => {
          console.log(reponse);
          Swal.fire({
            title: "Nouvelle publication postée !",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //Delete post
    deletePost(id) {
      let local = JSON.parse(localStorage.user);
      let token = local.token;

      axios
        .delete(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: { id },
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            text: "Post supprimé",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    //DELETE comment
    deleteComment(id) {
      let local = JSON.parse(localStorage.user);
      let token = local.token;
      axios
        .delete(`http://localhost:3000/comments/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: { id },
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            text: "Commentaire supprimé",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    //CREATE a new comment
    newComment(id) {
      let local = JSON.parse(localStorage.user);
      let userId = local.userId;
      let nom = local.nom;
      let prenom = local.prenom;
      let date = Date.now();
      axios({
        method: "post",
        url: "http://localhost:3000/comments",
        data: {
          content: this.contentComment,
          userId: userId,
          postId: id,
          nom: nom,
          prenom: prenom,
          date,
        },
        headers: { "Content-Type": "application/json" },
      })
        .then((reponse) => {
          console.log(reponse);
          Swal.fire({
            title: "Nouveau commentaire posté !",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    } else {
      this.user = JSON.parse(localStorage.getItem("user"));
      // GET ALL posts
      axios
        .get(`http://localhost:3000/posts`)
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => {
          this.postErr = err;
        });
      // GET ALL comments
      axios
        .get(`http://localhost:3000/comments`)
        .then((res) => {
          this.comments = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.commentErr = err;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
form {
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
}

.content > form {
  border: none;
}

.postPict {
  width: 230px;
  height: 200px;
  background-position: center;
  background-size: cover;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5%;
  margin: 20px 0px 20px 0px;
}

.form-group {
  width: 99%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 1.5rem;
}

.form-comment {
  width: 99%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 1.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid rgb(133, 133, 133);
  border-radius: 5px;
}

.form-comment input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid rgb(133, 133, 133);
  border-radius: 5px;
}
.form-group input::placeholder {
  color: rgb(133, 133, 133);
}

.form-group button {
  width: 7rem;
  align-self: center;
  cursor: pointer;
  color: black;
  background-color: #ffd7d7;
  font-size: 1.1rem;
  transition: 0.4s;
  padding: 5px 0px;
  border-radius: 20px;
}
.form-group button:hover {
  transform: scale(1.1);
}

.all-posts-container {
  width: 90%;
  margin: auto;
  @media screen and (min-width: 768px) {
    width: 60%;
  }
}

.post-container {
  margin-bottom: 13px;
}

.infos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #ffd7d7;
  border-radius: 20px 20px 0px 0px;
}
.author {
  display: flex;
  align-content: center;
  font-size: 0.9rem;
}

.anchorCoworker {
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.username {
  margin: 0px 0px 0px 10px;
  display: flex;
  align-items: center;
}

.date {
  margin: 0px 5px 0px 0px;
}

.dateDelete {
  display: flex;
  align-items: center;
}

.dateDelete p {
  font-size: 0.8rem;
  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
  }
}

.deleteIcon {
  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
    cursor: pointer;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem 0 1rem;
  background-color: white;
  border: 2px solid #ffd7d7;
  border-radius: 0px 0px 20px 20px;
}
.content h3 {
  font-size: 1.1rem;
}

.content p {
  text-align: justify;
  margin-top: 10px;
}

.commentBtn {
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 12px;
}

.commentStructure {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.comment-container {
  width: 80%;
  font-size: 0.85rem;
  border-bottom: 2px solid #95cbd3;
  border-left: 2px solid #95cbd3;
  border-right: 2px solid #95cbd3;
  border-radius: 20px;
  margin-top: 10px;
}
.comment-infos {
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid #95cbd3;
  border-radius: 20px 20px 0px 0px;
  background-color: #95cbd3;
}

.comment-username {
  margin-left: 5px;
  font-weight: bolder;
  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
}

.date {
  font-size: 0.8rem;
  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
}

.comment-content {
  font-style: italic;
  display: flex;
  justify-content: end;
  padding-right: 20px;
  margin-top: 10px;
}
</style>
