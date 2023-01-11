import {component$, useStylesScoped$} from '@builder.io/qwik';
import DemoSection from "~/components/demo-section/demo-section";
import discoverStyles from './discover.scss?inline';

export interface ICompany {
    logo: string;
    name: string;
    description: string;
    link: string;
    scale?: boolean;
};

export const companies: ICompany[] = [
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
        logo: 'https://dxc.scene7.com/is/image/dxc/DellTech_1050x1050?qlt=90&wid=1800&ts=1637166138311&$square_desktop$&dpr=off',
        name: 'Dell EMC US',
        description: 'Data Storage, Cloud, Converged and Data Protection',
        link: 'https://www.dellemc.com/en-us/index.htm',
        scale: true
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
        logo: 'https://static.developerhub.io/landing/images/logo-92a931e8f4120d8a7246ea0247865ab5.svg',
        name: 'DeveloperHub',
        description: 'DeveloperHub.io - Hosted Documentation Portals for Product And API Docs',
        link: 'https://developerhub.io',
    },
    {
        logo: 'https://www.inmopc.com/img/products/acuerdos-trovimap.jpg',
        name: 'Trovimap',
        description: 'Trovimap - Houses / Apartments / Locals for sale or rent',
        link: 'https://trovimap.com/'
    },
    {
        logo: 'https://www.atmetis.nl/wp-content/uploads/2017/08/cropped-logo-atmetis-tagline-rgb1500px-1.png',
        name: 'AtMetis',
        description: 'Internal web-application for AtMetis - assessment company from Netherlands',
        link: 'https://www.atmetis.nl/'
    },
    {
        logo: 'https://www.pramati.com/wp-content/themes/twentynineteen-child/images/logo.svg',
        name: 'Pramati Technologies Private Limited',
        description: 'Pramati - Independent, innovative technology companies focused on\n' +
            'profitable, well-defined markets',
        link: 'https://www.pramati.com/'
    },
    {
        logo: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco/v1484678055/ectxiezxgzm3srv2jkvh.png',
        name: 'Employes',
        description: 'Employes is a dutch based payroll-provider that offers a unique modern way to pay employees.\n',
        link: 'https://app.employes.nl/'
    },
    {
        logo: 'https://easi.net/sites/default/files/styles/gallery_image/public/2019-05/EASI-color.png',
        name: 'EASI',
        description: 'EASI is a cloud, security & software provider offering management applications, professional cloud & security solutions and IT infrastructure services.',
        link: 'https://easi.net/en'
    }
];


export default component$(() => {
    useStylesScoped$(discoverStyles);

    return (
        <DemoSection>
            <div class="common-header">
                <div class="title-box">
                    <h1>Welcome to ngx-bootstrap!</h1>
                    <p>
                    The best way to quickly integrate <a href="https://getbootstrap.com/docs/5.1" target="_blank">Bootstrap 5 </a> or <a href="https://getbootstrap.com/docs/4.0">Bootstrap 4 </a> Components with Angular
                    </p>
                    <div class="statistic-box">
                        <a href="https://npmjs.org/ngx-bootstrap" target="_blank">
                            <img src="https://img.shields.io/npm/v/ngx-bootstrap/latest.svg" alt="npm latest version" />
                        </a>
                        <a href="https://npmjs.org/ngx-bootstrap" target="_blank">
                            <img src="https://img.shields.io/npm/v/ngx-bootstrap/next.svg" alt="npm next version" />
                        </a>
                        <br/>
                        <a href="https://npmjs.org/ngx-bootstrap" target="_blank">
                            <img src="https://img.shields.io/npm/dm/ngx-bootstrap.svg" alt="npm downloads"/>
                        </a>
                        <a href="https://opencollective.com/ngx-bootstrap" target="_blank">
                            <img src="https://opencollective.com/ngx-bootstrap/tiers/backer/badge.svg?label=backer&color=brightgreen"/>
                        </a>
                    </div>
                </div>

                <div class="d-flex links-box">
                    <a class="d-block" href="https://github.com/valor-software/ngx-bootstrap" target="_blank"><i class="arrow-link"></i>Github link</a>
                    <a class="d-block" href="https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY" target="_blank"><i class="arrow-link"></i>Slack channel </a>
                </div>
            </div>

            <h2>Table of contents</h2>
            <ol>
                <li onClick$={() => {document.getElementById('users')?.scrollIntoView()}} class="cursor-pointer"><a>Who is using ngx-bootstrap</a></li>
                <li onClick$={() => {document.getElementById('releases')?.scrollIntoView()}} class="cursor-pointer"><a>Versioning and Releases</a></li>
                <li onClick$={() => {document.getElementById('changelog')?.scrollIntoView()}} class="cursor-pointer"><a>Changelog</a></li>
                <li onClick$={() => {document.getElementById('community')?.scrollIntoView()}} class="cursor-pointer"><a>Community</a></li>
            </ol>

            <h2 id="users" class='anchor-elem'>Who is using <span className="pln">ngx-bootstrap</span></h2>
            <p>Some time ago, we've started to investigate
                <a href="https://github.com/valor-software/ngx-bootstrap/issues/5168" target="_blank">companies, which using library ngx-bootstrap</a> in
                their projects.
            </p>
            <p>We know, that for now, we have more than <a href="https://github.com/valor-software/ngx-bootstrap/network/dependents" target="_blank">60000 dependents</a>, but
                let's see who are they:
            </p>
            <div class="container">
                <div class="row">
                    {companies.map(company => {
                        return (
                            <div class="col-xl-6 col-md-12 col-sm-12 col-xs-12 company-card">
                                <a class="company-info-wrapper overflow-hidden" href={company.link} target="_blank">
                                    <div class={`logo-name ${company.scale ? 'overflow-hidden' : ''}`}>
                                        <img class={`${company.scale ? 'img-scale' : ''}`} src={company.logo} alt={`${company.name} logo`}/>
                                    </div>
                                    <div class="company-description">{company.description}</div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
            <br/>
            <div>If your company also using ngx-bootstrap and you want to be in this list: just add an appropriate comment to
                <a href="https://github.com/valor-software/ngx-bootstrap/issues/5168" target="_blank">this investigation issue: 5168.</a>
            </div>
            <h2 id="releases" class='anchor-elem'>Versioning and Releases </h2>
            <div>We make all possible to make ngx-bootstrap wide-compatible. Compatibility table you can find in the
                <a target="_blank" href="#/documentation#compatibility">documentation</a>.
            </div>
            <div>All our issues , enhancements, feature requests, which would be taken into work first you can find in the nearest
                <a target="_blank" href="https://github.com/valor-software/ngx-bootstrap/milestones">Milestone</a>.
            </div>
            <h2 id="changelog" class='anchor-elem'>Changelog</h2>
            <p> All notable changes are described in the
                <a target="_blank" href="https://github.com/valor-software/ngx-bootstrap/blob/development/CHANGELOG.md">CHANGELOG.md</a> file.
            </p>
            <h2 id="community" class='anchor-elem'>Community</h2>
            <p>Chat with us on <a target="_blank" href="https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY">Slack</a>.</p>
            <p>For help using NGX-bootstrap, ask on <a target="_blank" href="https://stackoverflow.com/questions/tagged/ngx-bootstrap">StackOverflow</a> using the tag <b>ngx-bootstrap</b>.</p>
            <p>Follow our core team member <a href="https://twitter.com/valorkin" target="_blank">@valorkin</a> on Twitter.</p>
            <p>If you also would like to show support or simply give back to Open Source community, please consider becoming a
            backer sponsor of ngx-bootstrap on <a href="https://opencollective.com/ngx-bootstrap" target="_blank">OpenCollective</a>.</p>
        </DemoSection>
    );
});

