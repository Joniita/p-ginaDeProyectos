import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: String;
  public project: Project;
  public save_project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Crear projecto";
    this.project = new Project("", "", "", 2022 , "", "", "");
    this.status = "";
    this.filesToUpload = new Array<File>();
    this.save_project = this.project;
    this.url = Global.url;

  }

  ngOnInit(): void {
  }

  onSubmit(form: any){

    //Guardar los datos

    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project){
          

          //Subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, "image")
            .then((result:any) => {
              this.status = "succes";
              this.save_project = result.project;
              form.reset();
            });
          }
          else{
            this.status = "succes";
            this.save_project = response.project;
            form.reset();
          }

        }else{
          this.status = "failed";
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
