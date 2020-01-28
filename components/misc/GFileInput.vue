<template>
  <div class="g-file-input">
    <input
      class="g-file-input__input"
      name="file"
      type="file"
      id="avatar-picker"
      :accept="accept"
      @change="filePicked"
    />
    <label
      :class="{ 'g-file-input__label--picked': files }"
      class="g-file-input__label"
      for="avatar-picker"
    >
      <span v-if="files">{{ selectedFilesSize }}</span>
      <span
        :class="{ 'g-file-input__filename--picked': files }"
        class="g-file-input__filename"
        >{{
          files ? files[0].name : $i18n.t("sign-up-avatar-placeholder")
        }}</span
      >

      <fa-icon
        :class="{ 'g-file-input__icon--picked': files }"
        class="g-file-input__icon"
        :icon="files ? 'times' : 'camera'"
      ></fa-icon>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    isMultiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ""
    }
  },
  data() {
    return { files: null };
  },
  computed: {
    selectedFilesSize() {
      if (!this.files) return "0B";
      const totalSizeInBytes = this.files.reduce((sum, currValue) => {
        return sum + currValue.size;
      }, 0);
      return this.humanFileSize(totalSizeInBytes);
    }
  },
  methods: {
    humanFileSize(size) {
      if (i == 0) return "0B";
      var i = Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
      );
    },
    filePicked(event) {
      this.files = Array.from(event.target.files);
      this.$emit("filesPicked", this.files);
    }
  }
};
</script>

<style lang="scss" scoped>
.g-file-input {
  width: 100%;
  &__input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  &__icon {
    font-size: $icon-size-medium;
    color: $LightGray;
    &--picked {
      color: $White;
    }
  }

  &__filename {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 150px;
    display: inline-block;
    &--picked {
      font-weight: bold;
    }
  }
  &__label {
    width: 100%;
    border: 1px $LightGray solid;
    border-radius: 10px;
    padding: 15px 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    &--picked {
      background-image: $LinearGradient;
      border: none;
      color: $White;
    }
  }
}
</style>
