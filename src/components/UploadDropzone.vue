<template>
  <div>
    <button 
      @click="triggerFileInput"
      class="bg-primaryRed hover:bg-red-700 text-white px-5 py-3 rounded-none font-semibold transition-colors shadow-md flex items-center space-x-2"
    >
      <PaperclipIcon class="w-5 h-5" />
      <span>Anexar Arquivo CSV</span>
    </button>
    <input type="file" ref="fileInput" class="hidden" accept=".csv" @change="handleFileChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Paperclip as PaperclipIcon } from 'lucide-vue-next'
import Papa from 'papaparse'

const emit = defineEmits(['data-parsed'])

const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) processFile(file)
  e.target.value = '' // reset input so same file can be uploaded again
}

const processFile = (file) => {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (results) => {
      emit('data-parsed', results.data)
    }
  })
}
</script>
