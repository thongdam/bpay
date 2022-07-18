<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-card-title
        ><h1 class="font-weight-bold text-h3">
          <v-icon>mdi-desktop-classic</v-icon> ປິດລະບົບ
        </h1></v-card-title
      >
      <v-container>
        <v-row dense>
          <v-col v-for="(item, i) in items" :key="i" cols="3">
            <v-card :color="item.color" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="text-h5 text-uppercase"
                    v-text="item.title" 
                  ></v-card-title>
                  <v-card-subtitle class="text-uppercase" v-text="item.artist"></v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-3"
                      fab
                      height="40px"
                      right
                      width="40px"
                      color="yellow"
                    >
                      <v-icon>mdi-pause-octagon-outline</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
                <v-avatar class="ma-2" size="180" tile>
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: "#FF0063",
        src: require('@/assets/auto_debit.jpg'),
        title: "auto debit",
        artist: "close auto debit end of year",
      },
      {
        color: "#3AB0FF",
        src: require('@/assets/leasing.jpg'),
        title: "leasing",
        artist: "close leasing end of year",
      },
      {
        color: "#3EC70B",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "water",
        artist: "close water end of year",
      },
      {
        color: "#92B4EC",
        src: require('@/assets/edl.jpg'),
        title: "Electricite",
        artist: "close Electricite Du Laos end of year",
      },
    ],
  }),
};
</script>
<style lang="scss" scoped></style>
