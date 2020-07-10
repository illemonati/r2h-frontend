import * as React from "react";
import { lazy, Suspense } from "react";
import riskCalculatorConfigs from "./configs/riskCalculatorConfig.json";
import questions from "./configs/questions.json";
import { Switch, Route } from "react-router-dom";
import pageLinks from "./configs/links.json";

const LifeStyleComponent = lazy(() =>
    import("./modules/LifeStyle/LifeStyleComponent")
);
const HealthComponent = lazy(() => import("./modules/Health/HealthComponent"));
const SettingsComponent = lazy(() =>
    import("./modules/Settings/SettingsComponent")
);
const LifeStyleResourcesComponent = lazy(() =>
    import("./modules/LifeStyle/LifeStyleResources/LifeStyleResourcesComponent")
);
const NearMeComponent = lazy(() =>
    import("./modules/Health/NearMe/NearMeComponent")
);
const RiskCalculatorComponent = lazy(() =>
    import("./modules/RiskCalculator/RiskCalculatorComponent")
);
const HomePageComponent = lazy(() =>
    import("./modules/HomePage/HomePageComponent")
);
const SurveyComponent = lazy(() => import("./modules/Survey/SurveyComponent"));
const MyProfileComponent = lazy(() =>
    import("./modules/Settings/MyProfile/MyProfileComponent")
);
const MapComponent = lazy(() => import("./modules/Map/MapComponent"));
const FoodBanksMapComponent = lazy(() =>
    import("./modules/Map/SpecificMaps/FoodBanksComponent")
);
const FreeClinicsMapComponent = lazy(() =>
    import("./modules/Map/SpecificMaps/FreeClinicsComponent")
);
const SystemConfigurationComponent = lazy(() =>
    import(
        "./modules/Settings/SystemConfiguration/SystemConfigurationComponent"
    )
);
const OssAttributionsComponent = lazy(() =>
    import("./modules/Settings/OssAttributions/OssAttributionsComponent")
);
const DiseasesSearchComponent = lazy(() =>
    import("./modules/Health/DiseasesSearch/DiseasesSearchComponent")
);

export default function RouterComponent() {
    return (
        <Suspense fallback={<></>}>
            <Switch>
                {/* Demo Survey */}
                <Route path="/survey" excat>
                    <SurveyComponent
                        questions={questions}
                        dbCollectionName={"demo-survey-0"}
                    />
                </Route>

                {/* Demo Calculator */}
                <Route path="/risk-calculator" exact>
                    <RiskCalculatorComponent configs={riskCalculatorConfigs} />
                </Route>

                {/* LifeStyle Routes */}
                <Route path="/lifestyle" exact>
                    <LifeStyleComponent />
                </Route>
                <Route path="/lifestyle/resources" exact>
                    <LifeStyleResourcesComponent />
                </Route>

                {/* Health Routes */}
                <Route path="/health" exact>
                    <HealthComponent />
                </Route>
                <Route path="/health/diseases-search" exact>
                    <DiseasesSearchComponent />
                </Route>
                <Route path="/health/near-me" exact>
                    <NearMeComponent />
                </Route>

                {/* Settings Routes */}
                <Route path="/settings" exact>
                    <SettingsComponent />
                </Route>
                <Route path="/settings/my-profile" exact>
                    <MyProfileComponent />
                </Route>
                <Route path="/settings/system-configuration" exact>
                    <SystemConfigurationComponent />
                </Route>
                <Route path="/settings/oss-attributions" exact>
                    <OssAttributionsComponent />
                </Route>

                {/* Map */}
                <Route path="/map/query/" component={MapComponent} />
                <Route path="/map/food-banks/" exact>
                    <FoodBanksMapComponent />
                </Route>
                <Route path="/map/free-clinics/" exact>
                    <FreeClinicsMapComponent />
                </Route>

                {/* HomePage */}
                <Route path="/" exact>
                    <HomePageComponent pageLinks={pageLinks} />
                </Route>
            </Switch>
        </Suspense>
    );
}
