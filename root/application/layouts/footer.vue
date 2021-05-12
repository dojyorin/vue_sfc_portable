<template>
<v-footer app dark tile padless :color="color">
    <v-row no-gutters justify="center">
        Copyright
    </v-row>
</v-footer>
</template>

<script>
export default {
    props: {
        color: String
    }
};
</script>