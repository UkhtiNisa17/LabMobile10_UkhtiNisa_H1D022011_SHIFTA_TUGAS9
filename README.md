## Penjelasan
![lampiran](loginvue.png)
<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <!-- Title -->
        <ion-text style="margin-bottom: 20px; text-align: center">
          <h1>Praktikum Pemrograman Mobile</h1>
        </ion-text>

        <!-- Button Sign In -->
        <ion-button @click="login" color="light">
          <ion-icon slot="start" :icon="logoGoogle"></ion-icon>
          <ion-label>Sign In with Google</ion-label>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonText,
  IonLabel,
} from "@ionic/vue";
import { logoGoogle } from "ionicons/icons";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const login = async () => {
  await authStore.loginWithGoogle();
};
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

ion-button {
  --border-radius: 8px;
}
</style>
1. Proses yang Terjadi
- Rendering Halaman:
        Saat halaman dimuat, template ditampilkan:
            Judul halaman muncul di tengah layar.
            Tombol login dengan ikon Google tampil di bawah judul.

- Interaksi Pengguna:
        Pengguna mengklik tombol Sign In with Google.
        Event @click="login" dipicu, dan fungsi login() dijalankan.

- Proses Login:
        Fungsi login() memanggil authStore.loginWithGoogle():
            Proses autentikasi Google dimulai (biasanya menggunakan Firebase Authentication atau library lain).
            Setelah login berhasil, aplikasi dapat menyimpan informasi pengguna, misalnya nama, email, atau token autentikasi.

- Respons Autentikasi:
        Jika login berhasil:
            Informasi pengguna diperbarui di store (authStore), yang dapat diakses di seluruh aplikasi.
        Jika login gagal:
            Error akan ditangani sesuai dengan implementasi di loginWithGoogle() (tidak diperlihatkan di kode ini).
![lampiran](auth.png)
![lampiran](home.png)
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div></div>
      <TabsMenu />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import TabsMenu from "@/components/TabsMenu.vue";
</script>
1. Struktur Template
- Tag <template>: Mendefinisikan struktur HTML dari komponen.
- Tag <ion-page>: Komponen utama dari Ionic yang membungkus seluruh halaman aplikasi.
- Tag <ion-header>: Bagian header dari halaman yang biasanya digunakan untuk menampilkan judul atau navigasi.
        - Properti :translucent="true": Menjadikan header terlihat transparan dengan sedikit efek buram.
- Tag <ion-toolbar>: Komponen toolbar di dalam header untuk menampung elemen-elemen seperti judul.
        - Tag <ion-title>: Menampilkan teks "Home" sebagai judul halaman.
- Tag <ion-content>: Area utama untuk menampilkan konten halaman.
        - Properti :fullscreen="true": Mengatur agar konten menggunakan seluruh tinggi layar, termasuk area di bawah header jika diperlukan.
- Tag <TabsMenu />: Komponen custom (didefinisikan di file @/components/TabsMenu.vue) yang kemungkinan berfungsi sebagai menu tab navigasi untuk aplikasi.
2. Proses yang Terjadi
- Saat Aplikasi Dimuat:
        Vue akan memproses file ini sebagai komponen tunggal dengan template, script, dan style.
- Rendering Komponen:
        Elemen-elemen Ionic seperti IonHeader dan IonContent akan dirender sebagai bagian dari struktur halaman.
        Komponen custom TabsMenu akan dimasukkan di posisi <TabsMenu />, memuat menu navigasi atau elemen lain sesuai definisinya.
- Interaksi Pengguna:
        Header akan menampilkan judul "Home".
        TabsMenu memungkinkan pengguna untuk berinteraksi dengan menu navigasi (kemungkinan berpindah halaman/tab).
![lampiran](profile.png)
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Profile</ion-title>

        <!-- Logout Button -->
        <ion-button
          slot="end"
          fill="clear"
          @click="logout"
          style="--color: gray"
        >
          <ion-icon slot="end" :icon="exit"></ion-icon>
          <ion-label>Logout</ion-label>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Avatar -->
      <div id="avatar-container">
        <ion-avatar>
          <img alt="Avatar" :src="userPhoto" @error="handleImageError" />
        </ion-avatar>
      </div>

      <!-- Data Profile -->
      <ion-list>
        <ion-item>
          <ion-input
            label="Nama"
            :value="user?.displayName"
            :readonly="true"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            label="Email"
            :value="user?.email"
            :readonly="true"
          ></ion-input>
        </ion-item>
      </ion-list>

      <!-- Tabs Menu -->
      <TabsMenu />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
  IonButton,
  IonAvatar,
} from "@ionic/vue";
import { exit } from "ionicons/icons";
import { computed, ref } from "vue";
import TabsMenu from "@/components/TabsMenu.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const logout = () => {
  authStore.logout();
};

const userPhoto = ref(
  user.value?.photoURL || "https://ionicframework.com/docs/img/demos/avatar.svg"
);

function handleImageError() {
  userPhoto.value = "https://ionicframework.com/docs/img/demos/avatar.svg";
}
</script>

<style scoped>
#avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

#avatar-icon {
  width: 80px;
  height: 80px;
}
</style>
1. Proses yang Terjadi
- Saat Halaman Dimuat:
        Data Pengguna: Data diambil dari authStore.
        Avatar: URL foto profil pengguna diambil. Jika kosong, akan menggunakan gambar default.
- Rendering Konten:
        Header ditampilkan dengan tombol "Logout".
        Avatar dan data profil (nama dan email) ditampilkan.
        Tabs Menu muncul di bagian bawah.
- Interaksi Pengguna:
        Logout: Jika tombol logout diklik, fungsi logout() dipanggil untuk menghapus sesi pengguna.
- Fallback Avatar:
        Jika gambar profil gagal dimuat, handleImageError() mengganti URL ke gambar default.


  ![Lampiran](homeawl.png)
  ![Lampiran](add.png)
  ![Lampiran](homeadd.png)
  ![Lampiran](edit.png)
  ![Lampiran](complete.png)
  ![Lampiran](completetodo.png)
  ![Lampiran](hps.png)
  ![Lampiran](sukseshps.png)
