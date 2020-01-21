import { Component } from '@angular/core';

@Component({
  selector: 'discover',
  templateUrl: './discover.component.html',
  styleUrls: ['discover.component.scss']
})

export class DiscoverComponent {
  name = `Native Angular widgets for Bootstrap 3 and Bootstrap 4 - Discover more`;
  src = 'https://github.com/valor-software/ngx-bootstrap';

  companies = [
    {
      logo: 'https://www.lumeer.io/wp-content/themes/lumeer/assets/img/logo-big.svg',
      name: 'Lumeer',
      description: 'Easy visual tool for project and team management, that covers all your needs',
      link: 'https://www.lumeer.io/'
    },
    {
      logo: 'https://user-images.githubusercontent.com/663563/70622944-3eb68600-1c1d-11ea-82d3-7ccbd75befe8.png',
      name: 'Sustainablebuildings',
      description: 'SaaS product that give users insight in their power, gas consumption and other data',
      link: 'https://sustainablebuildings.nl'
    },
    {
      logo: 'https://marketplace.vmware.com/resources/profiles/emc-corporation__1534778173832.png',
      name: 'Dell EMC US',
      description: 'Data Storage, Cloud, Converged and Data Protection',
      link: 'https://www.dellemc.com/en-us/index.htm'
    },
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Soci%C3%A9t%C3%A9_G%C3%A9n%C3%A9rale.svg/279px-Soci%C3%A9t%C3%A9_G%C3%A9n%C3%A9rale.svg.png',
      name: 'Societe Generale Group',
      description: 'The Bank serving 31 million clients worldwide',
      link: 'https://www.societegenerale.com/en/home'
    },
    {
      logo: 'http://www.azerothcore.org/images/logo.png',
      name: 'AzerothCore',
      description: 'AzerothCore, a no-profit organisation composed by volunteers who have a passion for open source',
      link: 'http://www.azerothcore.org/'
    },
    {
      logo: 'https://res.cloudinary.com/developerhub/image/upload/v1561908888/1/gmoiyrndwsboeffgiz1x.svg',
      name: 'DeveloperHub',
      description: 'DeveloperHub.io - Hosted Documentation Portals for Product And API Docs',
      link: 'https://developerhub.io'
    },
    {
      logo: 'https://i.ytimg.com/vi/Em6PAkViyU4/maxresdefault.jpg',
      name: 'Trovimap',
      description: 'Trovimap - Houses / Apartments / Locals for sale or rent',
      link: 'https://trovimap.com/'
    }
  ];
}
