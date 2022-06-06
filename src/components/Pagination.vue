<template>
  <q-pagination
    v-model="current"
    color="black"
    :max="total"
    :max-pages="6"
    :boundary-numbers="true"
    @click.prevent="pageItem(current)"
  ></q-pagination>
</template>
<script>
import {
  ref,
  onMounted,
} from 'vue';

export default {
  props: ['pages', 'totalItem'],
  setup(props, { emit }) {
    const current = ref(null);
    const total = ref(null);
    onMounted(() => {
      current.value = props.pages + 1;
      if (props.totalItem > 0) {
        total.value = props.totalItem;
      }
    });
    const pageItem = (num) => {
      emit('emitpage', num - 1);
    };
    return {
      pageItem,
      current,
      total,
    };
  },
};
</script>
