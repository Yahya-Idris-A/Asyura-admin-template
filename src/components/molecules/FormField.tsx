import React from "react";
import { Label } from "../atoms/Label";
import { Input, type InputProps } from "../atoms/Input";

interface FormFieldProps extends InputProps {
  label: string;
  helperText?: string;
  errorMessage?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, required, helperText, errorMessage, id, className, ...props }, ref) => {
    
    // Auto-generate ID jika tidak diberikan, agar htmlFor di Label selalu valid
    const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const isError = Boolean(errorMessage);

    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
        
        <Input 
          id={inputId} 
          ref={ref} 
          error={isError} 
          required={required}
          {...props} 
        />
        
        {/* Helper Text atau Error Message */}
        {isError ? (
          <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {errorMessage}
          </span>
        ) : helperText ? (
          <span className="text-xs text-foreground/50">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);
FormField.displayName = "FormField";