import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cafeteria Konecta';
  

  constructor(private bnIdle: BnNgIdleService, private toastr:ToastrService, private router:Router) {}

  // Time out
  ngOnInit(): void {
    this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      this.toastr.error('Su sesión a sido finalizada por inactividad!', '', {
        timeOut: 30000,
      });
    });
    
  }

}
