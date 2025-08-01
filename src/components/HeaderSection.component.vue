<template>
    <div :class="CSS_CLASSES.PAGE_HEADER">
        <div :class="CSS_CLASSES.HEADER_CONTENT">
            <h1>{{ title }}</h1>
            <p class="subtitle">{{ subtitle }}</p>
        </div>
        <div :class="CSS_CLASSES.POKEBALL_DECORATION"></div>
    </div>
</template>

<script setup lang="ts">
import { CSS_CLASSES } from '../constants';

defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    position: relative;
    border-radius: 16px;
    background: linear-gradient(135deg, #2c3e50 0%, #4a69bd 100%);
    padding: 32px;
    color: white;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.header-content {
    position: relative;
    z-index: 2;
}

.page-header h1 {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: bold;
}

.subtitle {
    font-size: 16px;
    opacity: 0.9;
    margin: 0;
}

.pokeball-decoration {
    position: absolute;
    right: -30px;
    top: -30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    opacity: 0.8;
}

.pokeball-decoration::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    top: 50%;
    transform: translateY(-50%);
}

.pokeball-decoration::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>