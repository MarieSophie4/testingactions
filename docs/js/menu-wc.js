'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">brokerportal documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AbeStateTrackerModule.html" data-type="entity-link" >AbeStateTrackerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AbeStateTrackerModule-4f8630bbb19a4d79be84242140eed0ef77d5a30bb2fc8c71b71a9521849a1311841a9636a62ee1dbc645f7b59122cf780f2fce16c0d98b59b5b7d43d1f5212db"' : 'data-target="#xs-directives-links-module-AbeStateTrackerModule-4f8630bbb19a4d79be84242140eed0ef77d5a30bb2fc8c71b71a9521849a1311841a9636a62ee1dbc645f7b59122cf780f2fce16c0d98b59b5b7d43d1f5212db"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AbeStateTrackerModule-4f8630bbb19a4d79be84242140eed0ef77d5a30bb2fc8c71b71a9521849a1311841a9636a62ee1dbc645f7b59122cf780f2fce16c0d98b59b5b7d43d1f5212db"' :
                                        'id="xs-directives-links-module-AbeStateTrackerModule-4f8630bbb19a4d79be84242140eed0ef77d5a30bb2fc8c71b71a9521849a1311841a9636a62ee1dbc645f7b59122cf780f2fce16c0d98b59b5b7d43d1f5212db"' }>
                                        <li class="link">
                                            <a href="directives/AbeStateTrackerDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AbeStateTrackerDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-bfb68e3fd9a0b9b317e1aeeb8ed4333a59c0139efbd66ec5274420c4006357afc3c2d5af3700e4d4a3d71e30023679670574fa4f37faeb69912004839a51c7d1"' : 'data-target="#xs-components-links-module-AppModule-bfb68e3fd9a0b9b317e1aeeb8ed4333a59c0139efbd66ec5274420c4006357afc3c2d5af3700e4d4a3d71e30023679670574fa4f37faeb69912004839a51c7d1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-bfb68e3fd9a0b9b317e1aeeb8ed4333a59c0139efbd66ec5274420c4006357afc3c2d5af3700e4d4a3d71e30023679670574fa4f37faeb69912004839a51c7d1"' :
                                            'id="xs-components-links-module-AppModule-bfb68e3fd9a0b9b317e1aeeb8ed4333a59c0139efbd66ec5274420c4006357afc3c2d5af3700e4d4a3d71e30023679670574fa4f37faeb69912004839a51c7d1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-9507021c8551ad64032515cb2e13c4cd4720052e7599750bd49db862682b664296577378f3a700cbfe36d0209c94677d91696b4dfa89e488df87220ec84c1131"' : 'data-target="#xs-injectables-links-module-AuthModule-9507021c8551ad64032515cb2e13c4cd4720052e7599750bd49db862682b664296577378f3a700cbfe36d0209c94677d91696b4dfa89e488df87220ec84c1131"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-9507021c8551ad64032515cb2e13c4cd4720052e7599750bd49db862682b664296577378f3a700cbfe36d0209c94677d91696b4dfa89e488df87220ec84c1131"' :
                                        'id="xs-injectables-links-module-AuthModule-9507021c8551ad64032515cb2e13c4cd4720052e7599750bd49db862682b664296577378f3a700cbfe36d0209c94677d91696b4dfa89e488df87220ec84c1131"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CookieService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CookieService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormUtilsModule.html" data-type="entity-link" >FormUtilsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PagesModule-7cd56d1956ae09bfbd4a49af1e8362053f00e78a9c754eaf8bc453061cf0924409bb61300d55a57a1acd0434dd6fecb573e432000f2912b14d20cb9e191aa0d4"' : 'data-target="#xs-components-links-module-PagesModule-7cd56d1956ae09bfbd4a49af1e8362053f00e78a9c754eaf8bc453061cf0924409bb61300d55a57a1acd0434dd6fecb573e432000f2912b14d20cb9e191aa0d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-7cd56d1956ae09bfbd4a49af1e8362053f00e78a9c754eaf8bc453061cf0924409bb61300d55a57a1acd0434dd6fecb573e432000f2912b14d20cb9e191aa0d4"' :
                                            'id="xs-components-links-module-PagesModule-7cd56d1956ae09bfbd4a49af1e8362053f00e78a9c754eaf8bc453061cf0924409bb61300d55a57a1acd0434dd6fecb573e432000f2912b14d20cb9e191aa0d4"' }>
                                            <li class="link">
                                                <a href="components/ClaimoverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClaimoverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClosureComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClosureComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConsultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeclarationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeclarationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExtensionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExtensionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchClientModule.html" data-type="entity-link" >SearchClientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SearchClientModule-c180d8754ba3022d219e35bb2ec1e387edb7534ed6aa17de227576fa333af9c563a31f7ab714000b39d27805cace2688418c801d2d1e4b7a3e0f2fb717fab537"' : 'data-target="#xs-components-links-module-SearchClientModule-c180d8754ba3022d219e35bb2ec1e387edb7534ed6aa17de227576fa333af9c563a31f7ab714000b39d27805cace2688418c801d2d1e4b7a3e0f2fb717fab537"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchClientModule-c180d8754ba3022d219e35bb2ec1e387edb7534ed6aa17de227576fa333af9c563a31f7ab714000b39d27805cace2688418c801d2d1e4b7a3e0f2fb717fab537"' :
                                            'id="xs-components-links-module-SearchClientModule-c180d8754ba3022d219e35bb2ec1e387edb7534ed6aa17de227576fa333af9c563a31f7ab714000b39d27805cace2688418c801d2d1e4b7a3e0f2fb717fab537"' }>
                                            <li class="link">
                                                <a href="components/ResultsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchClientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/PagesAbstractDirective.html" data-type="entity-link" >PagesAbstractDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppConfigLoader.html" data-type="entity-link" >AppConfigLoader</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockSearchservice.html" data-type="entity-link" >MockSearchservice</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link" >SearchService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CifGuard.html" data-type="entity-link" >CifGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppConfig.html" data-type="entity-link" >AppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Auth0ClientProfile.html" data-type="entity-link" >Auth0ClientProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Auth0Config.html" data-type="entity-link" >Auth0Config</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormEventOptions.html" data-type="entity-link" >FormEventOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NamedFormGroup.html" data-type="entity-link" >NamedFormGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pages.html" data-type="entity-link" >Pages</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchCredentials.html" data-type="entity-link" >SearchCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchPolicy.html" data-type="entity-link" >SearchPolicy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link" >SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Urls.html" data-type="entity-link" >Urls</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});