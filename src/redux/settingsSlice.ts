import { defaultSettingsType, SelectedTabType, UploadedImage, ImageFilterUpdate } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Canvas } from "fabric"

const defaultSettings: defaultSettingsType = {
  canvas: null,
  ratio: 0,
  template: 0,
  tab: "template",
  selectedImage: null,
  images: []
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: defaultSettings,
  reducers: {
    changeTemplateByIndex: (state, action: PayloadAction<number>) => {
      state.template = action.payload
    },
    changeRatioByIndex: (state, action: PayloadAction<number>) => {
      state.ratio = action.payload
    },
    changeTab: (state, action: PayloadAction<SelectedTabType>) => {
      state.tab = action.payload
    },
    setCanvas: (state, action: PayloadAction<Canvas>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.canvas = action.payload
    },
    newImage: (state, action: PayloadAction<UploadedImage>) => {
      state.images = [
        ...state.images,
        action.payload
      ]
    },
    setSelectedImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = state.images.find((image) => image.id === action.payload) || null
    },
    clearSelectedImage: (state) => {
      state.selectedImage = null
    },
    setImageFilterValue: (state, action: PayloadAction<ImageFilterUpdate>) => {
      const { imageId, filterType, filterValue } = action.payload
      const { selectedImage } = state

      if (selectedImage && selectedImage.id === imageId) {
        selectedImage.filters = {
          ...selectedImage.filters,
          [filterType]: filterValue,
        }
      }
    }
  },
})

export const {
  changeTemplateByIndex,
  changeRatioByIndex,
  changeTab,
  setCanvas,
  newImage,
  setSelectedImage,
  clearSelectedImage,
  setImageFilterValue
} = settingsSlice.actions

export default settingsSlice.reducer
