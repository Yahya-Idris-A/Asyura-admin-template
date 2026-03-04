"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
}

export const StatsCard = ({ title, value, trend, icon }: StatsCardProps) => {
  const isPositive = trend >= 0;

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col gap-4 transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground/70">{title}</span>
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-xs text-foreground/50">vs last month</span>
        </div>
      </div>
    </motion.div>
  );
};