<template>
    <h1>退出登录……</h1>
</template>

<script>
export default {
    mounted(){
        this.$router.push('/');
        sessionStorage.clear()
    }
}
</script>

