import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { filter, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  mobileMenu: boolean = true;
  openMenu = false;
  activeNav!: string;

  _alive$ = new Subject<boolean>(); 

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(["(max-width: 895px)"])
      .pipe(takeUntil(this._alive$))
      .subscribe((state: BreakpointState) => {
        this.mobileMenu = state.breakpoints["(max-width: 895px)"];
        if(!this.mobileMenu) { 
          this.openMenu = true;
        } else {
          this.openMenu = false;
        }       
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const segments  = event.url.split('/');
      this.activeNav  = segments[segments.length - 1];            
    });
    
  }

  ngOnDestroy(): void {
    this._alive$.next(true);
    this._alive$.complete();
  }

  handleOpenMenu():void {
    if(this.mobileMenu) this.openMenu = !this.openMenu;
  }
}
