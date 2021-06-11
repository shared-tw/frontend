<script setup lang="ts">
import { computed, defineProps, ref, defineEmit } from 'vue'
import {
  startOfMonth, lastDayOfMonth, addMonths, getDay,
  addDays, isToday, isSameMonth, isSameDay, eachDayOfInterval,
  format, getMonth, setMonth,
} from 'date-fns'
import { useEventListener } from '@vueuse/core'

type TDay = {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmit(['update:modelValue'])

const calendar = ref<HTMLDivElement>()
const isShow = ref(false)

const showCalendar = () => { isShow.value = true }
const hideCalendar = () => { isShow.value = false }

const DAY_LABELS_TW = [
  '日',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
]
const MONTH_LABELS_TW = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]
/*
const DAY_LABELS = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
*/

const currDateCursor = ref(new Date(props.modelValue))
const selectedDate = ref(new Date(props.modelValue))

const formatedDate = computed(() => format(selectedDate.value, 'yyyy-MM-dd'))

const curYear = computed(() => currDateCursor.value.getFullYear())
const curMonth = computed(() => MONTH_LABELS_TW[currDateCursor.value.getMonth()])
const dates = computed(() => {
  const cursorDate = currDateCursor
  let startDate = startOfMonth(cursorDate.value)
  let endDate = lastDayOfMonth(cursorDate.value)
  const daysNeededForLastMonth = getDay(startDate)
  const daysNeededForNextMonth = 6 - getDay(endDate)
  startDate = addDays(startDate, -daysNeededForLastMonth)
  endDate = addDays(endDate, daysNeededForNextMonth)

  return eachDayOfInterval({ start: startDate, end: endDate }).map((date: Date) => ({
    date,
    isCurrentMonth: isSameMonth(cursorDate.value, date),
    isToday: isToday(date),
    isSelected: isSameDay(selectedDate.value, date),
  }))
})

const formatDateToDay = (val: Date) => format(val, 'd')

const dayClassObj = (day: TDay) => ({
  today: day.isToday,
  current: day.isCurrentMonth,
  selected: day.isSelected,
})

const nextMonth = () => {
  currDateCursor.value = addMonths(currDateCursor.value, 1)
}

const prevMonth = () => {
  currDateCursor.value = addMonths(currDateCursor.value, -1)
}

const setSelectedDate = (day: TDay) => {
  selectedDate.value = day.date
  emit('update:modelValue', format(selectedDate.value, 'yyyy-MM-dd'))
  // change calendar to correct month if they select previous or next month's days
  if (!day.isCurrentMonth) {
    const selectedMonth = getMonth(selectedDate.value)
    currDateCursor.value = setMonth(currDateCursor.value, selectedMonth)
  }
  hideCalendar()
}

const handleOutsideClick = (e: Event) => {
  e.stopPropagation()

  if (!calendar.value?.contains(e.target as Node)) {
    hideCalendar()
  }
}

useEventListener(document, 'click', handleOutsideClick)
useEventListener(document, 'touchstart', handleOutsideClick)
</script>
<template>
  <div
    ref="calendar"
    class="relative"
  >
    <input
      :value="formatedDate"
      class="border border-tansparent rounded-md outline-none w-full py-2 px-3 focus:border-gray-400"
      readonly
      @focus="showCalendar"
    >
    <div
      v-if="isShow"
      class="bg-white border-0 pt-1 px-2 py-3 rounded-md shadow-md grid grid-cols-7 absolute -left-15 mt-1 z-50"
    >
      <header class="flex items-center justify-around col-span-7">
        <button class="icon-btn text-sm" @click="prevMonth">
          <mdi:chevron-double-left />
        </button>
        <span class="p-2">{{ curMonth }} {{ curYear }}</span>
        <button class="icon-btn text-sm" @click="nextMonth">
          <mdi:chevron-double-right />
        </button>
      </header>
      <div v-for="dayLabel in DAY_LABELS_TW" :key="dayLabel" class="flex items-center justify-center">
        {{ dayLabel }}
      </div>
      <div
        v-for="(day, index) in dates"
        :key="index"
        class="rounded"
        :class="dayClassObj(day)"
      >
        <button
          class="date-btn"
          :class="dayClassObj(day)"
          @click="setSelectedDate(day)"
        >
          {{ formatDateToDay(day.date) }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.date-btn {
  @apply outline-none text-gray-400 w-full rounded py-1 px-2
    flex justify-center focus:bg-primary focus:text-white;
}

.current {
  @apply text-gray-600;
}

.today {
  @apply bg-secondary text-white;
}

.selected {
  @apply  bg-primary text-white;
}
</style>
