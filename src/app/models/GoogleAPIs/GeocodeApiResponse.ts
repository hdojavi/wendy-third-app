export interface GeocodeApiResponse {
    plus_code: Pluscode;
    results: Result[];
    status: string;
  }
  
  export interface Result {
    access_points: (Accesspoint | Accesspoints2)[];
    address_components: Addresscomponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    plus_code?: Pluscode;
    types: string[];
  }
  
  export interface Geometry {
    location: Location2;
    location_type: string;
    viewport: Viewport;
    bounds?: Viewport;
  }
  
  export interface Viewport {
    northeast: Location2;
    southwest: Location2;
  }
  
  export interface Location2 {
    lat: number;
    lng: number;
  }
  
  export interface Addresscomponent {
    long_name: string;
    short_name: string;
    types: string[];
  }
  
  export interface Accesspoints2 {
    access_point_type: string;
    location: Location;
    location_on_segment: Location;
    place_id: string;
    segment_position: number;
    unsuitable_travel_modes: any[];
  }
  
  export interface Accesspoint {
    access_point_type: string;
    location: Location;
    place_id: string;
    unsuitable_travel_modes: any[];
  }
  
  export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface Pluscode {
    compound_code: string;
    global_code: string;
  }