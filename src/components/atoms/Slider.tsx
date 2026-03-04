import React, { useId } from "react";
import { Label } from "./Label";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  value: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className = "", label, value, min = 0, max = 100, id, ...props }, ref) => {
    const reactId = useId();
    const sliderId = id || `slider-${reactId}`;
    
    // Kalkulasi persentase untuk background warna (track progress)
    const percentage = ((value - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        {label && (
          <div className="flex justify-between items-center">
            <Label htmlFor={sliderId}>{label}</Label>
            <span className="text-sm font-medium text-foreground/70">{value}</span>
          </div>
        )}
        <input
          type="range"
          id={sliderId}
          ref={ref}
          min={min}
          max={max}
          value={value}
          style={{
            background: `linear-gradient(to right, var(--color-primary) ${percentage}%, var(--color-border) ${percentage}%)`
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background transition-all
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-grab active:[&::-moz-range-thumb]:cursor-grabbing"
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";