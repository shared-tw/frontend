<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'

type TDay = {
  date: Dayjs
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

interface Props {
  modelValue?: string
  format?: string
}

const props = withDefaults(defineProps<Props>(), {
  format: 'YYYY-MM-DD',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

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

const currDateCursor = ref(dayjs(props.modelValue))
const selectedDate = ref(dayjs(props.modelValue))

const formatedDate = computed(() => selectedDate.value.format(props.format))

const curYear = computed(() => currDateCursor.value.year())
const curMonth = computed(() => MONTH_LABELS_TW[currDateCursor.value.month()])
const dates = computed(() => {
  const cursorDate = currDateCursor
  const startOfMonth = cursorDate.value.startOf('M')
  const endOfMonth = cursorDate.value.endOf('M')
  const daysNeededForLastMonth = startOfMonth.day()
  const daysNeededForNextMonth = 6 - endOfMonth.day()
  const startDate = startOfMonth.add(-daysNeededForLastMonth, 'd')
  const endDate = endOfMonth.add(daysNeededForNextMonth, 'd')

  return Array.from({ length: endDate.diff(startDate, 'd') + 1 }).map((_, i) => {
    const date = startDate.add(i, 'd')

    return {
      date,
      isCurrentMonth: date.isSame(cursorDate.value, 'M'),
      isToday: date.isSame(dayjs(props.modelValue)),
      isSelected: date.isSame(selectedDate.value),
    }
  })
})

const formatDateToDay = (val: Dayjs) => val.date()

const dayClassObj = (day: TDay) => ({
  today: day.isToday,
  current: day.isCurrentMonth,
  selected: day.isSelected,
})

const nextMonth = () => {
  currDateCursor.value = currDateCursor.value.add(1, 'M')
}

const prevMonth = () => {
  currDateCursor.value = currDateCursor.value.add(-1, 'M')
}

const setSelectedDate = (day: TDay) => {
  selectedDate.value = day.date
  emit('update:modelValue', selectedDate.value.format('YYYY-MM-DD'))
  // change calendar to correct month if they select previous or next month's days
  if (!day.isCurrentMonth) {
    const selectedMonth = selectedDate.value.month()
    currDateCursor.value = currDateCursor.value.month(selectedMonth)
  }
}
</script>
<template>
  <AppPopover>
    <input
      :value="formatedDate"
      class="border border-tansparent rounded-md outline-none w-full py-2 px-3 focus:border-gray-400"
      :readonly="true"
    >
    <template #content>
      <div
        class="calendar-container"
      >
        <header class="flex col-span-7 items-center justify-around">
          <button
            class="text-sm icon-btn"
            @click.stop="prevMonth"
          >
            <uil:angle-double-left />
          </button>
          <span class="p-2">
            {{ curMonth }} {{ curYear }}
          </span>
          <button
            class="text-sm icon-btn"
            @click.stop="nextMonth"
          >
            <uil:angle-double-right />
          </button>
        </header>
        <div
          v-for="dayLabel in DAY_LABELS_TW"
          :key="dayLabel"
          class="flex items-center justify-center"
        >
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
    </template>
  </AppPopover>
</template>
<style scoped lang="postcss">
.calendar-container {
  @apply
    grid grid-cols-7
    bg-white border-0
    pt-1 px-2 py-3 mt-1 z-2
    rounded-md shadow-md;
    /* absolute left-0; */
}
.date-btn {
  @apply
    outline-none w-full rounded-md
    py-1 px-2
    flex justify-center
    focus:bg-primary
    text-gray-400 focus:text-white;
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
