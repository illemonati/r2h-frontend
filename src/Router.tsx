import * as React from "react";
import { lazy, Suspense } from "react";
import riskCalculatorConfigs from "./configs/riskCalculatorConfig.json";
import questions from "./configs/questions.json";
import { Switch, Route, Redirect } from "react-router-dom";
import pageLinks from "./configs/links.json";
import burnoutQuestions from "./configs/burnout-prevention.processed.json";
import { SliderQuestion } from "./modules/Survey/QuestionsFormat";

console.log(burnoutQuestions);

const NotFoundComponent = lazy(
    () => import("./modules/NotFound/NotFoundComponent")
);

const CovidStatsComponent = lazy(
    () => import("./modules/Health/CovidStats/CovidStatsComponent")
);

const LifeStyleComponent = lazy(
    () => import("./modules/LifeStyle/LifeStyleComponent")
);
const HealthComponent = lazy(() => import("./modules/Health/HealthComponent"));
const SettingsComponent = lazy(
    () => import("./modules/Settings/SettingsComponent")
);
const LifeStyleResourcesComponent = lazy(
    () =>
        import(
            "./modules/LifeStyle/LifeStyleResources/LifeStyleResourcesComponent"
        )
);
const NearMeComponent = lazy(
    () => import("./modules/Health/NearMe/NearMeComponent")
);
const RiskCalculatorComponent = lazy(
    () => import("./modules/RiskCalculator/RiskCalculatorComponent")
);
const HomePageComponent = lazy(
    () => import("./modules/HomePage/HomePageComponent")
);
const SurveyComponent = lazy(() => import("./modules/Survey/SurveyComponent"));
const MyProfileComponent = lazy(
    () => import("./modules/Settings/MyProfile/MyProfileComponent")
);
const MapComponent = lazy(() => import("./modules/Map/MapComponent"));
const FoodBanksMapComponent = lazy(
    () => import("./modules/Map/SpecificMaps/FoodBanksComponent")
);
const FreeClinicsMapComponent = lazy(
    () => import("./modules/Map/SpecificMaps/FreeClinicsComponent")
);
const SystemConfigurationComponent = lazy(
    () =>
        import(
            "./modules/Settings/SystemConfiguration/SystemConfigurationComponent"
        )
);
const OssAttributionsComponent = lazy(
    () => import("./modules/Settings/OssAttributions/OssAttributionsComponent")
);
const DiseasesSearchComponent = lazy(
    () => import("./modules/Health/DiseasesSearch/DiseasesSearchComponent")
);

const HeartRateDetectComponent = lazy(
    () => import("./modules/Health/HeartRateDetect/HeartRateDetectComponent")
);

export default function RouterComponent() {
    return (
        <Suspense fallback={<></>}>
            <Switch>
                {/* Demo Survey */}
                <Route path="/survey" excat>
                    <SurveyComponent
                        questions={burnoutQuestions}
                        dbCollectionName={"demo-survey-0"}
                    />
                </Route>
                <Route path="/survey/burnout-prevention" excat>
                    <SurveyComponent
                        questions={burnoutQuestions as SliderQuestion[]}
                        dbCollectionName={"burnout-survey-0"}
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
                <Route path="/health/covid-stats" exact>
                    <CovidStatsComponent />
                </Route>
                <Route path="/health/heart-rate-detect" exact>
                    <HeartRateDetectComponent />
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

                {/* 404 */}
                <Route path="/404" exact>
                    <NotFoundComponent />
                </Route>
                <Redirect to="/404" />
            </Switch>
        </Suspense>
    );
}
