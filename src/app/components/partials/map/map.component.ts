import { Component, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { icon, LatLngTuple, Map, latLng, map, tileLayer, Marker, LatLng, marker, LatLngExpression, LeafletEvent, LeafletMouseEvent, LatLngLiteral } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/Models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges{
  @Input()
  order!:Order;
  @Input()
  readonly = false;


  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62]
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
    'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize:[42,42],
    iconAnchor:[21,42]
  })
  @ViewChild('map',{static:true}) 
  mapRef!:ElementRef;
  map!:Map
  currentMarker!:Marker;

  constructor(private locationservice:LocationService){
  }


  ngOnChanges(): void {


    if(!this.order) return;
    this.initializeMap();

    if(this.readonly && this.addressLatlng){
      this.showLocationOnReadonlyMode();
    }

  }
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setmarker(this.addressLatlng);
    m.setView(this.addressLatlng,this.MARKER_ZOOM_LEVEL)
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }


  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement,{
      attributionControl:false
    }).setView(this.DEFAULT_LATLNG,1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  
    this.map.on('click',(e:LeafletMouseEvent)=>{
      this.setmarker(e.latlng)
    })
  }
  findMylocation(){
    this.locationservice.getCurrentLocation().subscribe({
      next:(latLng)=>{
        this.map.setView(latLng,this.MARKER_ZOOM_LEVEL)
        this.setmarker(latLng)
      }
    })
   }
   setmarker(latlng:LatLngExpression){
    this.adressLatLng = latlng as LatLng
    if(this.currentMarker)
    {
    this.currentMarker.setLatLng(latlng)
    return;
   }
   this.currentMarker = marker(latlng,{
    draggable:true,
    icon:this.MARKER_ICON
   }).addTo(this.map);

   this.currentMarker.on('dragend',() =>{
    this.adressLatLng = this.currentMarker.getLatLng();
   })
  }

  set adressLatLng(latlng:LatLng){

    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8))
    latlng.lng = parseFloat(latlng.lng.toFixed(8))
    this.order.addressLatLng =latlng;
    console.log(this.order.addressLatLng)
  }
  get addressLatlng(){
    return this.order.addressLatLng!;
  }
  
}
