<template>
    <div>
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%;">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img src="/images/logo.png" alt="logo" class="mb-2" style="width:303px; height:92px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="grid flex flex-column align-items-center">
                        <div class="flex justify-content-center align-items-center bg-pink-500 border-circle" style="height:3.2rem; width:3.2rem;">
                            <i class="pi pi-fw pi-exclamation-circle text-2xl text-50"></i>
                        </div>
                        <h1 class="font-bold text-5xl text-900 mb-2">Email verification on process</h1>
                        <div class="col-8 mt-5 text-center">
                            <ProgressBar mode="indeterminate" style="height: .3em" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useVerifications from './../composables/verifications'
import { onMounted } from 'vue'

const { update_status } = useVerifications()

onMounted(update_status)
</script>