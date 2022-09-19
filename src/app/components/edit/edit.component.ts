import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: String;
  public project: Project;
  public save_project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: String;


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar proyecto";
    this.project = new Project("", "", "", 2022 , "", "", "");
    this.status = "";
    this.filesToUpload = new Array<File>();
    this.save_project = this.project;
    this.url = Global.url;

  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      console.log(id);

      this.getProject(id);
    });
  }

  getProject(id: any){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;

      },
      error => {
        console.log(<any>error)
      }
    )
  }

  onSubmit(form: any){
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.update){
          let fileInput = this.filesToUpload.length;

          //Subir la imagen
          if(fileInput >= 1){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.update._id, [], this.filesToUpload, "image")
            .then((result:any) => {
              this.status = "succes";
              this.save_project = result.project;
              console.log("con imagen");
              
            });
          }
          else{ 
            console.log("sin imagen");    
            this.save_project = response.project;       
            this.status = "succes";
            
            
            
          };


        }else{
          this.status = "failed";
        }

        
      },
      error => {
        console.log(<any>error);
      }
    )
    
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
