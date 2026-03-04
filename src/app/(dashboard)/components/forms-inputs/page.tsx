"use client";

import React, { useState } from "react";
import { Info, UploadCloud, Trash2, Send } from "lucide-react";

// Import Semua Senjata Kita
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { Textarea } from "@/components/atoms/Textarea";
import { Label } from "@/components/atoms/Label";
import { Switch } from "@/components/atoms/Switch";
import { Checkbox } from "@/components/atoms/Checkbox";
import { RadioGroup } from "@/components/atoms/RadioGroup";
import { Slider } from "@/components/atoms/Slider";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { TagInput } from "@/components/molecules/TagInput";
import { DatePicker } from "@/components/molecules/DatePicker";
import { FileUploader } from "@/components/molecules/FileUploader";
import { ProgressBar } from "@/components/atoms/Progress";
import { Timeline } from "@/components/molecules/Timeline";
import { Tooltip } from "@/components/atoms/Tooltip";
import { Popconfirm } from "@/components/molecules/Popconfirm";
import { WysiwygEditor } from "@/components/organisms/WysiwygEditor";

export default function FormsInputsPage() {
  // --- States untuk komponen interaktif ---
  const [switchOn, setSwitchOn] = useState(true);
  const [sliderVal, setSliderVal] = useState(65);
  const [radioVal, setRadioVal] = useState("opsi-2");
  const [selectVal, setSelectVal] = useState("go");
  const [tags, setTags] = useState<string[]>(["PostgreSQL", "NextJS"]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [wysiwygContent, setWysiwygContent] = useState("<h3>Welcome to UniDash Editor!</h3><p>Try making this text <strong>bold</strong> or adding a bullet list.</p>");

  // Dummy Data Timeline
  const timelineData = [
    { title: "Project Created", description: "Repository initialized via CLI.", time: "10:00 AM", isCompleted: true },
    { title: "Dependencies Installed", description: "Added Framer Motion & Zustand.", time: "10:15 AM", isCompleted: true },
    { title: "Deploy to Production", description: "Pending review from Lead Engineer.", time: "Pending", isCompleted: false, isLast: true }
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto pb-12">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Forms, Inputs & Interactions</h1>
        <p className="text-foreground/60 text-sm mt-1">
          A complete set of form controls and interactive elements for building complex dashboards.
        </p>
      </div>

      {/* SECTION 1: Buttons, Tooltips & Popconfirm */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">1. Buttons & Interactive Overlays</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="ghost">Ghost Button</Button>
            
            {/* Popconfirm pada tombol Danger */}
            <Popconfirm 
              title="Delete this project?" 
              description="This action cannot be undone and all data will be lost."
              onConfirm={() => alert("Project deleted!")}
            >
              <Button variant="danger" className="gap-2"><Trash2 className="w-4 h-4"/> Delete</Button>
            </Popconfirm>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-foreground/70 font-medium">Hover for more info: </span>
            {/* Tooltip diaplikasikan di icon */}
            <Tooltip content="Project architecture relies on PostgreSQL for data integrity." position="top">
              <div className="p-1.5 rounded-full bg-primary/10 text-primary cursor-help">
                <Info className="w-4 h-4" />
              </div>
            </Tooltip>
          </div>

        </div>
      </section>

      {/* SECTION 2: Standard Inputs */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">2. Standard Inputs</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm grid grid-cols-1 tablet:grid-cols-2 gap-6">
          <FormField label="Standard Text" placeholder="Enter your name..." />
          <FormField label="Password Input" type="password" placeholder="••••••••" helperText="Must be at least 8 characters." />
          <div className="tablet:col-span-2 flex flex-col gap-2">
            <Label>Bio / Description</Label>
            <Textarea placeholder="Write a short bio..." rows={3} />
          </div>
        </div>
      </section>

      {/* SECTION 3: Selection & Toggles */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">3. Selections & Toggles</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm grid grid-cols-1 tablet:grid-cols-2 gap-8">
          
          {/* Kolom Kiri */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Single Checkbox</Label>
              <Checkbox label="I agree to the Terms and Conditions" />
            </div>
            
            <Switch 
              label="Enable Notifications" 
              checked={switchOn} 
              onChange={setSwitchOn} 
            />

            <Slider 
              label="Volume Level" 
              value={sliderVal} 
              onChange={(e) => setSliderVal(Number(e.target.value))} 
            />
          </div>

          {/* Kolom Kanan */}
          <div>
            <RadioGroup 
              label="Choose Server Region"
              name="region"
              value={radioVal}
              onChange={setRadioVal}
              options={[
                { label: "US-East (N. Virginia)", value: "opsi-1", description: "Lowest latency for America" },
                { label: "AP-Southeast (Jakarta)", value: "opsi-2", description: "Recommended for local users" },
                { label: "EU-Central (Frankfurt)", value: "opsi-3" },
              ]}
            />
          </div>

        </div>
      </section>

      {/* SECTION 4: Advanced Form Controls */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">4. Advanced Controls</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm grid grid-cols-1 tablet:grid-cols-2 gap-6">
          <CustomSelect 
            label="Backend Technology"
            value={selectVal}
            onChange={setSelectVal}
            options={[
              { label: "Go (Golang)", value: "go" },
              { label: "Node.js", value: "node" },
              { label: "Python", value: "python" }
            ]}
          />
          
          <DatePicker 
            label="Target Launch Date" 
            value={selectedDate} 
            onChange={setSelectedDate} 
          />

          <div className="tablet:col-span-2">
            <TagInput 
              label="Required Skills (Max 5)" 
              tags={tags} 
              onChange={setTags} 
              maxTags={5} 
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: Media & Feedback */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">5. Uploads & Progress Tracking</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm grid grid-cols-1 tablet:grid-cols-2 gap-8 items-start">
          
          {/* Uploader */}
          <div className="space-y-4">
            <Label>Documentation Files</Label>
            <FileUploader 
              accept=".pdf,.docx,.txt" 
              maxFiles={2} 
              maxSizeMB={5}
              onChange={() => {}}
              helperText="Upload system architecture docs. Max 2 files (5MB each)."
            />
            
            <div className="mt-6 space-y-2">
               <Label>Simulated Upload Progress</Label>
               <ProgressBar value={sliderVal} label="Processing Data..." />
            </div>
          </div>

          {/* Timeline */}
          <div className="p-4 rounded-xl border border-border bg-background/50">
             <h3 className="text-sm font-semibold mb-4 text-foreground">Deployment Status</h3>
             <Timeline items={timelineData} />
          </div>

        </div>
      </section>
      
      {/* SECTION 6: Rich Text Editor (WYSIWYG) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">6. Rich Text Editor</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm grid grid-cols-1 desktop:grid-cols-2 gap-8 items-start">
          
          {/* Kolom Kiri: Editor */}
          <div>
            <WysiwygEditor 
              label="Article Content" 
              value={wysiwygContent} 
              onChange={setWysiwygContent} 
              placeholder="Start writing your masterpiece here..."
            />
          </div>

          {/* Kolom Kanan: Live Preview */}
          <div className="flex flex-col gap-2">
            <Label>Live Preview Output</Label>
            <div 
              // PENTING: Class 'prose' dari @tailwindcss/typography memastikan HTML kerender rapi
              className="w-full min-h-[150px] max-h-[500px] overflow-y-auto p-4 rounded-xl border border-border bg-background/50 prose prose-sm sm:prose-base max-w-none text-foreground custom-scrollbar"
              dangerouslySetInnerHTML={{ __html: wysiwygContent }}
            />
          </div>

        </div>
      </section>
    </div>
  );
}