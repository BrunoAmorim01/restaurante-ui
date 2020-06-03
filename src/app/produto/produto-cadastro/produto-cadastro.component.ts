import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Categoria } from './../model/Categoria';
import { ArquivoService } from './../../shared/arquivo.service';
import { SnackBarMessageService } from './../../shared/snack-bar-message.service';
import { ConfirmModalComponent } from './../../shared/confirm-modal/confirm-modal.component';
import { CadastroRapidoComponent } from './../../categoria/cadastro-rapido/cadastro-rapido.component';
import { MessagesService } from './../../shared/messages.service';
import { Produto } from './../model/Produto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from './../service/produto.service';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { CategoriaService } from './../service/categoria.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { catchError, take, tap, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.scss'],
})
export class ProdutoCadastroComponent implements OnInit, OnDestroy {
  obs = true;
  files: Set<File>;
  retrievedImage: string;
  upload$: Subscription;

  form: FormGroup;
  produto: Produto;
  categorias$: Observable<Categoria[]>;
  categorias: Categoria[];
  categoriaSelecionada: Categoria;
  origens: any[];
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    public dialog: MatDialog,
    private msgService: MessagesService,
    private snackBarMessageService: SnackBarMessageService,
    private arquivoService: ArquivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.produto = this.activatedRoute.snapshot.data.produto;
    console.log('produto retornado', this.produto);
    this.origens = [
      { id: 'NACIONAL', desc: 'Nacional' },
      { id: 'INTERNACIONAL', desc: 'Internacional' },
    ];

    if (this.produto === undefined || this.produto === null) {
      this.produto = new Produto();
    } else if (this.produto.nomeArquivo) {
      this.retrievedImage = this.showFile(this.produto.nomeArquivo);
    }

    this.form = this.fb.group({
      id: [this.produto.id],
      nome: [
        this.produto.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      origem: [this.produto.origem],
      preco: [
        this.produto.preco,
        [Validators.required, Validators.max(999999.99)],
      ],
      categoria: [this.produto.categoria.id, [Validators.required]],
      status: [this.produto.status],
      descricao: [
        this.produto.descricao,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255),
        ],
      ],
      quantidade: [this.produto.quantidade, [Validators.required]],
      nomeArquivo: [this.produto.nomeArquivo],
    });
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categorias$ = this.categoriaService.list().pipe(
      take(1),
      tap((c) => (this.categorias = c)),
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }
  onSubmit() {
    this.categoriaSelecionada = this.categorias.find(
      (c) => c.id === this.form.value.categoria
    );

    if (this.form.valid) {
      this.produto = this.form.value;
      this.produto.categoria = this.categoriaSelecionada;

      this.produtoService
        .salvar(this.produto)
        .pipe(
          tap((p) => {
            this.produto = p as Produto;
            this.form.patchValue(p);
            this.form.patchValue({
              categoria: this.produto.categoria.id,
            });
            console.log('produto salvo', p);
          })
        )
        .subscribe(
          (success) => {
            this.snackBarMessageService.openSnackbar(
              'Produto salvo com sucesso'
            );

            if (!isNaN(this.produto.id)) {
              console.log('if');
              this.router.navigate(['novo'], {
                relativeTo: this.activatedRoute.parent,
              });
            } else {
              this.form.reset({
                origem: 'NACIONAL',
                status: false,
                categoria: new Categoria(),
              });
            }
          },
          (error) => {
            console.error(error);
            this.snackBarMessageService.openSnackbar(
              'Aconteceu um erro ao salvar o produto'
            );
          }
        );
    } else {
      this.snackBarMessageService.openSnackbar('Formulario nao valido');
    }
  }
  MostrarMsgErroControl(control: string) {
    return this.msgService.sendMessageErrorFormControl(this.form.get(control));
  }

  onCadastroRapido(): void {
    const dialogRefRapido = this.dialog.open(CadastroRapidoComponent, {
      width: '250px',
      data: {},
    });

    dialogRefRapido
      .afterClosed()
      .pipe(
        take(1),
        switchMap((value) => {
          // if (dialogRefRapido.componentInstance.data.status) {
          if (value.nome) {
            console.log(value);
            return this.categoriaService.salvar(value);
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((result) => {
        if (result) {
          this.snackBarMessageService.openSnackbar(
            'Cadastro rápido feito com sucesso'
          );
          this.carregarCategorias();
        }
      });
  }

  excluir() {
    console.log('excluir');
    const dialogExcluir = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      data: {
        titulo: 'Apagar ' + this.form.value.nome,
        mensagem:
          'Tem certeza que deseja apagar? Esta ação não poderá ser desfeita',
        msgCancel: 'Cancelar',
        msgConfirm: 'Confirmar',
      },
    });

    dialogExcluir
      .afterClosed()
      .pipe(
        take(1),
        switchMap((value) => this.produtoService.deletar(this.form.value.id))
      )
      .subscribe(
        (success) => {
          console.log('sucesso');
          this.snackBarMessageService.openSnackbar(
            'Produto excluido com sucesso'
          );
          this.router.navigate(['novo'], {
            relativeTo: this.activatedRoute.parent,
          });
        },
        (error) => {
          console.error(error);
        }
      );
  }

  selectFile(event) {
    console.log(event);
    const selectFiles = event.srcElement.files as FileList;
    // const fileNames =[]
    this.files = new Set();

    for (const i of selectFiles) {
      // for (let i = 0; i < selectFiles.length; i++) {
      // fileNames.push(selectFiles[i].name);
      // this.files.add(selectFiles[i]);
      this.files.add(i);
    }
  }

  upload() {
    console.log('upload');
    if (this.produto.nomeArquivo) {
      console.log('upload if');
      this.arquivoService.delete(this.produto.nomeArquivo).subscribe();
      this.form.patchValue({
        nomeArquivo: null,
      });
    }

    if (this.files && this.files.size > 0) {
      this.upload$ = this.arquivoService
        .upload(this.files)
        .pipe(
          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
        )
        .subscribe((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            console.log('event', event.body.nome);
            console.log('Upload Concluído');
            // console.log('Upload Concluído',event.nome);
            this.form.patchValue({
              nomeArquivo: event.body.nome,
            });
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            console.log('Progresso', percentDone);
          }
        });
    }
  }

  showFile(nomeArquivo: string) {
    return this.arquivoService.getUrl(nomeArquivo);
  }

  ngOnDestroy(): void {
    if (this.upload$) {
      console.log(this.upload$.closed);
      this.upload$.unsubscribe();
    }
  }
}
