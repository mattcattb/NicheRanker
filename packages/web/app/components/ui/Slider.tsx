import {
  Label,
  Slider as RACSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components"
import type { SliderProps } from "react-aria-components"

interface MySliderProps<T> extends SliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: MySliderProps<T>) {
  return (
    <RACSlider {...props}>
      {label && <Label>{label}</Label>}
      <SliderOutput>
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
        }
      </SliderOutput>
      <SliderTrack>
        {({ state }) =>
          state.values.map((_, i) => (
            <SliderThumb key={i} index={i} aria-label={thumbLabels?.[i]} />
          ))
        }
      </SliderTrack>
    </RACSlider>
  )
}
