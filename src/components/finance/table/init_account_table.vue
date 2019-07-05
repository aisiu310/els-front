<template>
  <div>
    <Table :columns="columns10" :data="data9"></Table>
  </div>
</template>

<script>
import expandRow from './init_expand'
export default {
  data() {
    return {
      columns10: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data9: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          job: "Data engineer",
          interest: "badminton",
          birthday: "1991-05-14",
          book: "Steve Jobs",
          movie: "The Prestige",
          music: "I Cry"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
