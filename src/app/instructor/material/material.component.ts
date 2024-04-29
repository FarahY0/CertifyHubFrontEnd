import { Component,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InstructorService } from 'src/app/instructor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {

  test = ''
  SectionId: number = 0
 
  @ViewChild('createdialog') createMaterialDialog: any;
  @ViewChild('confirmdelet') Createconfirm: any
  @ViewChild('updatedilog') UpdateMatrailDilog: any


  constructor(public _instructorService: InstructorService, public dilog: MatDialog,private route: ActivatedRoute) {

  }
  
  ngOnInit() {
    this._instructorService.GetAllcourses();
    this.route.paramMap.subscribe(param => this.SectionId = Number(param.get('SectionId'))
    )
    this._instructorService.GetMaterialsBySectionId(this.SectionId);

  }

  createmateralform: FormGroup = new FormGroup(   //formgroup
    {
      materialname: new FormControl('', [Validators.required, Validators.minLength(2)]), //formcontroll
      materialpath: new FormControl(),
      videourl: new FormControl('', [Validators.required])

    }
  )

  updatemateralform: FormGroup = new FormGroup(   //formgroup
    {

      materialname: new FormControl('', [Validators.required, Validators.minLength(2)]), //formcontroll
      materialpath: new FormControl(),
      videourl: new FormControl('', [Validators.required]),
      materialid: new FormControl(),
      courseid: new FormControl(),
      course: new FormControl(),
      section:new FormControl()

    }
  )
  openupdatedilog(p: any) {
    console.log(p);
    this.updatemateralform.setValue(p)
    this.dilog.open(this.UpdateMatrailDilog)
  }


  Deletematerial(id: number) {
    this._instructorService.Deletematerial(id,this.SectionId)


  }

  CreateMaterial() {


    console.log(this.createmateralform.value);

    this._instructorService.CreateMaterial(this.createmateralform.value,this.SectionId)

  }

  updateMaterial() {
    this._instructorService.UpdateMaterial(this.updatemateralform.value,this.SectionId)


  }



  opencreatedilog() {
    this.dilog.open(this.createMaterialDialog, {
      width: "380px",
      height: "450px",

      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000


    })
  }


  openconfirmdilog(id: number) {
    var dilog = this.dilog.open(this.Createconfirm)
    dilog.afterClosed().subscribe(
      (result) => {
        if (result != undefined)
          if (result == 'yes')
            this.Deletematerial(id)


      }
    )

  }

  UploadImage( event : any){
    console.log(event);
   let file =  event.target.files[0]
   let form = new FormData()
   form.append('file' , file)
   this._instructorService.UploadImage(form,this.SectionId)


  }   

}
