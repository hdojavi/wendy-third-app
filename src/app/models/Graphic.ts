export interface Graphic {
    title: string;
    description: string;
    axisX: AxisValues;
    axisYBars: AxisValues[];
    axisYLines: AxisValues[];
}

export interface AxisValues {
    title: string;
    values: string[];
}
