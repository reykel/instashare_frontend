<template>
    <div>
        <div class="card p-fluid">
            <h5>Product gallery</h5>
            <InputText id="descripcion" v-model="producto.descripcion" type="hidden" class="w-full mb-3" placeholder="Description" style="padding:1rem;" />     

            <div class="col-sm-6 mt-4">
                <p class="text-danger" v-if="errors"> {{ errors.message }}</p> 
                <img v-bind:src="myFiles.image_product" alt="Image" width="250" height="160" />
                <form enctype="multipart/form-data" @submit.prevent="uploadFile">
                    <div class="form-group">
                        <FileUpload name="demo[]" :key="image_key" :customUpload="true" :multiple="false" @change="doc_type = 'image_product'" @uploader="myUploader" :fileLimit="1" />                     
                        <p class="text-danger" v-for="error in errors" :key="error"> {{ error.file }}</p>
                    </div>
                    <div v-if="fileSize">
                        <p>File size: {{ fileSize }} bytes</p>
                    </div>
                    <div class="car-buttons mt-5" v-if="myStates.image_product">
                        <a :download="producto.descripcion + '.png'" :href="myFiles.image_product" type="button" class="p-button p-button-warning p-button-rounded mr-2" style="width:20%!important"><i class="pi pi-download mr-3"></i> <p>Download</p></a>
                        <Button type="button" class="p-button-danger p-button-rounded mr-2" icon="pi pi-trash" @click="eraseImage('image_product')"></Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import useGalleries from '../../composables/galleries'
import useProductos from '../../composables/productos'

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const processing = ref()
        const confirm = useConfirm();
        const toast = useToast()
        const file = ref('')
        const fileSize = ref(null)
        const success = ref(true)
        const image_key = ref(0)
        const doc_type = ref('OK')

        const { myFiles, myStates, errors, uploadFile, retrieveFile, deleteFile, locatedFile } = useGalleries()
        const { producto, getProducto } = useProductos()

        onMounted(() => {
            retrieveFile(props.id)
            locatedFile()
            getProducto(props.id)
        })

        const onChange = (e) => {
            file.value = e.target.files[0]
            fileSize.value = file.value.size
        }

        const myUploader = async (event) => {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            const data = new FormData()
            data.append('document_type', doc_type.value)
            data.append('file', event.files[0])
            data.append('id', props.id)

            fileSize.value = event.files[0].size

            await uploadFile(data, config)
            await retrieveFile(props.id)
            await locatedFile()
            image_key.value += 1

            toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 5000 })
        }

        const eraseImage = async (image_name) => {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            const data = new FormData()

            confirm.require({
                message: 'Are you sure you want to proceed to delete your image?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    processing.value = true
                    data.append('document_type', image_name)
                    data.append('id', props.id)
                    await deleteFile(data, config)
                    await retrieveFile(props.id)
                    await locatedFile()
                    toast.add({ severity: 'success', summary: 'Done', detail: 'You have successfully deleted your image', life: 5000 })
                    processing.value = false
                },
            })
        }

        return {
            myFiles,
            myStates,
            processing,
            myUploader,
            onChange,
            uploadFile,
            deleteFile,
            retrieveFile,
            success,
            doc_type,
            eraseImage,
            image_key,
            locatedFile,
            producto,
            errors,
            fileSize
        }
    }
}
</script>

<style>

</style>