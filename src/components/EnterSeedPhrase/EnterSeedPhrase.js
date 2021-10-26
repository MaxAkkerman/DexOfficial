import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {batch, useDispatch, useSelector} from "react-redux";
import CloseBtn from "../CloseBtn/CloseBtn";
import Loader from "../Loader/Loader";
import MainBlock from "../MainBlock/MainBlock";
import "./EnterSeedPhrase.scss";
import client, {
    checkPubKey,
    getClientBalance,
    getClientKeys,
    subscribeClient,
    subscribeClientBalance,
} from "../../extensions/webhook/script";
import {
    deployClient,
    prepareClientDataForDeploy,
} from "../../extensions/sdk/run";

import {decrypt, decryptPure, encrypt, encryptPure, verifySeed} from "../../extensions/seedPhrase";

import {
    enterSeedPhraseSaveToLocalStorage, hideEnterSeedPhraseUnlock, setAfterEnterSeedLoading,
    setNewSide,
    setSeedPassword,
    showEnterSeedPhrase,
    wordEightEnterSeedPhrase,
    wordElevenEnterSeedPhrase,
    wordFiveEnterSeedPhrase,
    wordFourEnterSeedPhrase,
    wordNineEnterSeedPhrase,
    wordOneEnterSeedPhrase,
    wordSevenEnterSeedPhrase,
    wordSixEnterSeedPhrase,
    wordTenEnterSeedPhrase,
    wordThreeEnterSeedPhrase,
    wordTwelveEnterSeedPhrase,
    wordTwoEnterSeedPhrase,
} from "../../store/actions/enterSeedPhrase";
import {
    Alert,
    AlertTitle,
    Autocomplete,
    Box,
    Grid,
    Snackbar,
    TextField,
} from "@material-ui/core";

import {useMount, useUnmount} from "react-use";
import {
    setClientData,
    setSubscribeReceiveTokens,
    setTransactionsList,
} from "../../store/actions/wallet";
import {setCurExt, setTips, setWalletIsConnected} from "../../store/actions/app";
import {getWalletExt} from "../../extensions/extensions/checkExtensions";
import {useHistory} from "react-router-dom";
import {
    copyToClipboard,
    getAllPairsAndSetToStore,
    getAllTokensAndSetToStore, handleCutAddress, InitializeClient,
} from "../../reactUtils/reactUtils";
import styled from "@emotion/styled";
import WaitingPopup from "../WaitingPopup/WaitingPopup";
import PasswordEnterPopup from "../PasswordEnterPopup/PasswordEnterPopup";

function EnterSeedPhrase(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("");

    /*

    wordOne: "",
  wordTwo: "",
  wordThree: "",
  wordFour: "",
  wordFive: "",
  wordSix: "",
  wordSeven: "",
  wordEight: "",
  wordNine: "",
  wordTen: "",
  wordEleven: "",
  wordTwelve: "",
     */

    const enterSeedPhraseSide = useSelector(
        (state) => state.enterSeedPhrase.side,
    );
    const wordOne = useSelector((state) => state.enterSeedPhrase.wordOne);
    const wordTwo = useSelector((state) => state.enterSeedPhrase.wordTwo);
    const wordThree = useSelector((state) => state.enterSeedPhrase.wordThree);
    const wordFour = useSelector((state) => state.enterSeedPhrase.wordFour);
    const wordFive = useSelector((state) => state.enterSeedPhrase.wordFive);
    const wordSix = useSelector((state) => state.enterSeedPhrase.wordSix);
    const wordSeven = useSelector((state) => state.enterSeedPhrase.wordSeven);
    const wordEight = useSelector((state) => state.enterSeedPhrase.wordEight);
    const wordNine = useSelector((state) => state.enterSeedPhrase.wordNine);
    const wordTen = useSelector((state) => state.enterSeedPhrase.wordTen);
    const wordEleven = useSelector((state) => state.enterSeedPhrase.wordEleven);
    const wordTwelve = useSelector((state) => state.enterSeedPhrase.wordTwelve);

    const [wordOneError, setWordOneError] = useState(true);
    const [wordTwoError, setWordTwoError] = useState(true);
    const [wordThreeError, setWordThreeError] = useState(true);
    const [wordFourError, setWordFourError] = useState(true);
    const [wordFiveError, setWordFiveError] = useState(true);
    const [wordSixError, setWordSixError] = useState(true);
    const [wordSevenError, setWordSevenError] = useState(true);
    const [wordEightError, setWordEightError] = useState(true);
    const [wordNineError, setWordNineError] = useState(true);
    const [wordTenError, setWordTenError] = useState(true);
    const [wordElevenError, setWordElevenError] = useState(true);
    const [wordTwelveError, setWordTwelveError] = useState(true);

    function handleClose() {
        return dispatch(showEnterSeedPhrase(false));
    }

    const [seedPhraseString, setSeedPhraseString] = useState(``);
    const [validSeedPhrase, setValidSeedPhrase] = useState(false);
    const [seedPhrasePassword, setSeedPhrasePassword] = useState(``);
    const [validPassword, setValidPassword] = useState(false);

    const mnemonicWordsRaw =
        "abandon\nability\nable\nabout\nabove\nabsent\nabsorb\nabstract\nabsurd\nabuse\naccess\naccident\naccount\naccuse\nachieve\nacid\nacoustic\nacquire\nacross\nact\naction\nactor\nactress\nactual\nadapt\nadd\naddict\naddress\nadjust\nadmit\nadult\nadvance\nadvice\naerobic\naffair\nafford\nafraid\nagain\nage\nagent\nagree\nahead\naim\nair\nairport\naisle\nalarm\nalbum\nalcohol\nalert\nalien\nall\nalley\nallow\nalmost\nalone\nalpha\nalready\nalso\nalter\nalways\namateur\namazing\namong\namount\namused\nanalyst\nanchor\nancient\nanger\nangle\nangry\nanimal\nankle\nannounce\nannual\nanother\nanswer\nantenna\nantique\nanxiety\nany\napart\napology\nappear\napple\napprove\napril\narch\narctic\narea\narena\nargue\narm\narmed\narmor\narmy\naround\narrange\narrest\narrive\narrow\nart\nartefact\nartist\nartwork\nask\naspect\nassault\nasset\nassist\nassume\nasthma\nathlete\natom\nattack\nattend\nattitude\nattract\nauction\naudit\naugust\naunt\nauthor\nauto\nautumn\naverage\navocado\navoid\nawake\naware\naway\nawesome\nawful\nawkward\naxis\nbaby\nbachelor\nbacon\nbadge\nbag\nbalance\nbalcony\nball\nbamboo\nbanana\nbanner\nbar\nbarely\nbargain\nbarrel\nbase\nbasic\nbasket\nbattle\nbeach\nbean\nbeauty\nbecause\nbecome\nbeef\nbefore\nbegin\nbehave\nbehind\nbelieve\nbelow\nbelt\nbench\nbenefit\nbest\nbetray\nbetter\nbetween\nbeyond\nbicycle\nbid\nbike\nbind\nbiology\nbird\nbirth\nbitter\nblack\nblade\nblame\nblanket\nblast\nbleak\nbless\nblind\nblood\nblossom\nblouse\nblue\nblur\nblush\nboard\nboat\nbody\nboil\nbomb\nbone\nbonus\nbook\nboost\nborder\nboring\nborrow\nboss\nbottom\nbounce\nbox\nboy\nbracket\nbrain\nbrand\nbrass\nbrave\nbread\nbreeze\nbrick\nbridge\nbrief\nbright\nbring\nbrisk\nbroccoli\nbroken\nbronze\nbroom\nbrother\nbrown\nbrush\nbubble\nbuddy\nbudget\nbuffalo\nbuild\nbulb\nbulk\nbullet\nbundle\nbunker\nburden\nburger\nburst\nbus\nbusiness\nbusy\nbutter\nbuyer\nbuzz\ncabbage\ncabin\ncable\ncactus\ncage\ncake\ncall\ncalm\ncamera\ncamp\ncan\ncanal\ncancel\ncandy\ncannon\ncanoe\ncanvas\ncanyon\ncapable\ncapital\ncaptain\ncar\ncarbon\ncard\ncargo\ncarpet\ncarry\ncart\ncase\ncash\ncasino\ncastle\ncasual\ncat\ncatalog\ncatch\ncategory\ncattle\ncaught\ncause\ncaution\ncave\nceiling\ncelery\ncement\ncensus\ncentury\ncereal\ncertain\nchair\nchalk\nchampion\nchange\nchaos\nchapter\ncharge\nchase\nchat\ncheap\ncheck\ncheese\nchef\ncherry\nchest\nchicken\nchief\nchild\nchimney\nchoice\nchoose\nchronic\nchuckle\nchunk\nchurn\ncigar\ncinnamon\ncircle\ncitizen\ncity\ncivil\nclaim\nclap\nclarify\nclaw\nclay\nclean\nclerk\nclever\nclick\nclient\ncliff\nclimb\nclinic\nclip\nclock\nclog\nclose\ncloth\ncloud\nclown\nclub\nclump\ncluster\nclutch\ncoach\ncoast\ncoconut\ncode\ncoffee\ncoil\ncoin\ncollect\ncolor\ncolumn\ncombine\ncome\ncomfort\ncomic\ncommon\ncompany\nconcert\nconduct\nconfirm\ncongress\nconnect\nconsider\ncontrol\nconvince\ncook\ncool\ncopper\ncopy\ncoral\ncore\ncorn\ncorrect\ncost\ncotton\ncouch\ncountry\ncouple\ncourse\ncousin\ncover\ncoyote\ncrack\ncradle\ncraft\ncram\ncrane\ncrash\ncrater\ncrawl\ncrazy\ncream\ncredit\ncreek\ncrew\ncricket\ncrime\ncrisp\ncritic\ncrop\ncross\ncrouch\ncrowd\ncrucial\ncruel\ncruise\ncrumble\ncrunch\ncrush\ncry\ncrystal\ncube\nculture\ncup\ncupboard\ncurious\ncurrent\ncurtain\ncurve\ncushion\ncustom\ncute\ncycle\ndad\ndamage\ndamp\ndance\ndanger\ndaring\ndash\ndaughter\ndawn\nday\ndeal\ndebate\ndebris\ndecade\ndecember\ndecide\ndecline\ndecorate\ndecrease\ndeer\ndefense\ndefine\ndefy\ndegree\ndelay\ndeliver\ndemand\ndemise\ndenial\ndentist\ndeny\ndepart\ndepend\ndeposit\ndepth\ndeputy\nderive\ndescribe\ndesert\ndesign\ndesk\ndespair\ndestroy\ndetail\ndetect\ndevelop\ndevice\ndevote\ndiagram\ndial\ndiamond\ndiary\ndice\ndiesel\ndiet\ndiffer\ndigital\ndignity\ndilemma\ndinner\ndinosaur\ndirect\ndirt\ndisagree\ndiscover\ndisease\ndish\ndismiss\ndisorder\ndisplay\ndistance\ndivert\ndivide\ndivorce\ndizzy\ndoctor\ndocument\ndog\ndoll\ndolphin\ndomain\ndonate\ndonkey\ndonor\ndoor\ndose\ndouble\ndove\ndraft\ndragon\ndrama\ndrastic\ndraw\ndream\ndress\ndrift\ndrill\ndrink\ndrip\ndrive\ndrop\ndrum\ndry\nduck\ndumb\ndune\nduring\ndust\ndutch\nduty\ndwarf\ndynamic\neager\neagle\nearly\nearn\nearth\neasily\neast\neasy\necho\necology\neconomy\nedge\nedit\neducate\neffort\negg\neight\neither\nelbow\nelder\nelectric\nelegant\nelement\nelephant\nelevator\nelite\nelse\nembark\nembody\nembrace\nemerge\nemotion\nemploy\nempower\nempty\nenable\nenact\nend\nendless\nendorse\nenemy\nenergy\nenforce\nengage\nengine\nenhance\nenjoy\nenlist\nenough\nenrich\nenroll\nensure\nenter\nentire\nentry\nenvelope\nepisode\nequal\nequip\nera\nerase\nerode\nerosion\nerror\nerupt\nescape\nessay\nessence\nestate\neternal\nethics\nevidence\nevil\nevoke\nevolve\nexact\nexample\nexcess\nexchange\nexcite\nexclude\nexcuse\nexecute\nexercise\nexhaust\nexhibit\nexile\nexist\nexit\nexotic\nexpand\nexpect\nexpire\nexplain\nexpose\nexpress\nextend\nextra\neye\neyebrow\nfabric\nface\nfaculty\nfade\nfaint\nfaith\nfall\nfalse\nfame\nfamily\nfamous\nfan\nfancy\nfantasy\nfarm\nfashion\nfat\nfatal\nfather\nfatigue\nfault\nfavorite\nfeature\nfebruary\nfederal\nfee\nfeed\nfeel\nfemale\nfence\nfestival\nfetch\nfever\nfew\nfiber\nfiction\nfield\nfigure\nfile\nfilm\nfilter\nfinal\nfind\nfine\nfinger\nfinish\nfire\nfirm\nfirst\nfiscal\nfish\nfit\nfitness\nfix\nflag\nflame\nflash\nflat\nflavor\nflee\nflight\nflip\nfloat\nflock\nfloor\nflower\nfluid\nflush\nfly\nfoam\nfocus\nfog\nfoil\nfold\nfollow\nfood\nfoot\nforce\nforest\nforget\nfork\nfortune\nforum\nforward\nfossil\nfoster\nfound\nfox\nfragile\nframe\nfrequent\nfresh\nfriend\nfringe\nfrog\nfront\nfrost\nfrown\nfrozen\nfruit\nfuel\nfun\nfunny\nfurnace\nfury\nfuture\ngadget\ngain\ngalaxy\ngallery\ngame\ngap\ngarage\ngarbage\ngarden\ngarlic\ngarment\ngas\ngasp\ngate\ngather\ngauge\ngaze\ngeneral\ngenius\ngenre\ngentle\ngenuine\ngesture\nghost\ngiant\ngift\ngiggle\nginger\ngiraffe\ngirl\ngive\nglad\nglance\nglare\nglass\nglide\nglimpse\nglobe\ngloom\nglory\nglove\nglow\nglue\ngoat\ngoddess\ngold\ngood\ngoose\ngorilla\ngospel\ngossip\ngovern\ngown\ngrab\ngrace\ngrain\ngrant\ngrape\ngrass\ngravity\ngreat\ngreen\ngrid\ngrief\ngrit\ngrocery\ngroup\ngrow\ngrunt\nguard\nguess\nguide\nguilt\nguitar\ngun\ngym\nhabit\nhair\nhalf\nhammer\nhamster\nhand\nhappy\nharbor\nhard\nharsh\nharvest\nhat\nhave\nhawk\nhazard\nhead\nhealth\nheart\nheavy\nhedgehog\nheight\nhello\nhelmet\nhelp\nhen\nhero\nhidden\nhigh\nhill\nhint\nhip\nhire\nhistory\nhobby\nhockey\nhold\nhole\nholiday\nhollow\nhome\nhoney\nhood\nhope\nhorn\nhorror\nhorse\nhospital\nhost\nhotel\nhour\nhover\nhub\nhuge\nhuman\nhumble\nhumor\nhundred\nhungry\nhunt\nhurdle\nhurry\nhurt\nhusband\nhybrid\nice\nicon\nidea\nidentify\nidle\nignore\nill\nillegal\nillness\nimage\nimitate\nimmense\nimmune\nimpact\nimpose\nimprove\nimpulse\ninch\ninclude\nincome\nincrease\nindex\nindicate\nindoor\nindustry\ninfant\ninflict\ninform\ninhale\ninherit\ninitial\ninject\ninjury\ninmate\ninner\ninnocent\ninput\ninquiry\ninsane\ninsect\ninside\ninspire\ninstall\nintact\ninterest\ninto\ninvest\ninvite\ninvolve\niron\nisland\nisolate\nissue\nitem\nivory\njacket\njaguar\njar\njazz\njealous\njeans\njelly\njewel\njob\njoin\njoke\njourney\njoy\njudge\njuice\njump\njungle\njunior\njunk\njust\nkangaroo\nkeen\nkeep\nketchup\nkey\nkick\nkid\nkidney\nkind\nkingdom\nkiss\nkit\nkitchen\nkite\nkitten\nkiwi\nknee\nknife\nknock\nknow\nlab\nlabel\nlabor\nladder\nlady\nlake\nlamp\nlanguage\nlaptop\nlarge\nlater\nlatin\nlaugh\nlaundry\nlava\nlaw\nlawn\nlawsuit\nlayer\nlazy\nleader\nleaf\nlearn\nleave\nlecture\nleft\nleg\nlegal\nlegend\nleisure\nlemon\nlend\nlength\nlens\nleopard\nlesson\nletter\nlevel\nliar\nliberty\nlibrary\nlicense\nlife\nlift\nlight\nlike\nlimb\nlimit\nlink\nlion\nliquid\nlist\nlittle\nlive\nlizard\nload\nloan\nlobster\nlocal\nlock\nlogic\nlonely\nlong\nloop\nlottery\nloud\nlounge\nlove\nloyal\nlucky\nluggage\nlumber\nlunar\nlunch\nluxury\nlyrics\nmachine\nmad\nmagic\nmagnet\nmaid\nmail\nmain\nmajor\nmake\nmammal\nman\nmanage\nmandate\nmango\nmansion\nmanual\nmaple\nmarble\nmarch\nmargin\nmarine\nmarket\nmarriage\nmask\nmass\nmaster\nmatch\nmaterial\nmath\nmatrix\nmatter\nmaximum\nmaze\nmeadow\nmean\nmeasure\nmeat\nmechanic\nmedal\nmedia\nmelody\nmelt\nmember\nmemory\nmention\nmenu\nmercy\nmerge\nmerit\nmerry\nmesh\nmessage\nmetal\nmethod\nmiddle\nmidnight\nmilk\nmillion\nmimic\nmind\nminimum\nminor\nminute\nmiracle\nmirror\nmisery\nmiss\nmistake\nmix\nmixed\nmixture\nmobile\nmodel\nmodify\nmom\nmoment\nmonitor\nmonkey\nmonster\nmonth\nmoon\nmoral\nmore\nmorning\nmosquito\nmother\nmotion\nmotor\nmountain\nmouse\nmove\nmovie\nmuch\nmuffin\nmule\nmultiply\nmuscle\nmuseum\nmushroom\nmusic\nmust\nmutual\nmyself\nmystery\nmyth\nnaive\nname\nnapkin\nnarrow\nnasty\nnation\nnature\nnear\nneck\nneed\nnegative\nneglect\nneither\nnephew\nnerve\nnest\nnet\nnetwork\nneutral\nnever\nnews\nnext\nnice\nnight\nnoble\nnoise\nnominee\nnoodle\nnormal\nnorth\nnose\nnotable\nnote\nnothing\nnotice\nnovel\nnow\nnuclear\nnumber\nnurse\nnut\noak\nobey\nobject\noblige\nobscure\nobserve\nobtain\nobvious\noccur\nocean\noctober\nodor\noff\noffer\noffice\noften\noil\nokay\nold\nolive\nolympic\nomit\nonce\none\nonion\nonline\nonly\nopen\nopera\nopinion\noppose\noption\norange\norbit\norchard\norder\nordinary\norgan\norient\noriginal\norphan\nostrich\nother\noutdoor\nouter\noutput\noutside\noval\noven\nover\nown\nowner\noxygen\noyster\nozone\npact\npaddle\npage\npair\npalace\npalm\npanda\npanel\npanic\npanther\npaper\nparade\nparent\npark\nparrot\nparty\npass\npatch\npath\npatient\npatrol\npattern\npause\npave\npayment\npeace\npeanut\npear\npeasant\npelican\npen\npenalty\npencil\npeople\npepper\nperfect\npermit\nperson\npet\nphone\nphoto\nphrase\nphysical\npiano\npicnic\npicture\npiece\npig\npigeon\npill\npilot\npink\npioneer\npipe\npistol\npitch\npizza\nplace\nplanet\nplastic\nplate\nplay\nplease\npledge\npluck\nplug\nplunge\npoem\npoet\npoint\npolar\npole\npolice\npond\npony\npool\npopular\nportion\nposition\npossible\npost\npotato\npottery\npoverty\npowder\npower\npractice\npraise\npredict\nprefer\nprepare\npresent\npretty\nprevent\nprice\npride\nprimary\nprint\npriority\nprison\nprivate\nprize\nproblem\nprocess\nproduce\nprofit\nprogram\nproject\npromote\nproof\nproperty\nprosper\nprotect\nproud\nprovide\npublic\npudding\npull\npulp\npulse\npumpkin\npunch\npupil\npuppy\npurchase\npurity\npurpose\npurse\npush\nput\npuzzle\npyramid\nquality\nquantum\nquarter\nquestion\nquick\nquit\nquiz\nquote\nrabbit\nraccoon\nrace\nrack\nradar\nradio\nrail\nrain\nraise\nrally\nramp\nranch\nrandom\nrange\nrapid\nrare\nrate\nrather\nraven\nraw\nrazor\nready\nreal\nreason\nrebel\nrebuild\nrecall\nreceive\nrecipe\nrecord\nrecycle\nreduce\nreflect\nreform\nrefuse\nregion\nregret\nregular\nreject\nrelax\nrelease\nrelief\nrely\nremain\nremember\nremind\nremove\nrender\nrenew\nrent\nreopen\nrepair\nrepeat\nreplace\nreport\nrequire\nrescue\nresemble\nresist\nresource\nresponse\nresult\nretire\nretreat\nreturn\nreunion\nreveal\nreview\nreward\nrhythm\nrib\nribbon\nrice\nrich\nride\nridge\nrifle\nright\nrigid\nring\nriot\nripple\nrisk\nritual\nrival\nriver\nroad\nroast\nrobot\nrobust\nrocket\nromance\nroof\nrookie\nroom\nrose\nrotate\nrough\nround\nroute\nroyal\nrubber\nrude\nrug\nrule\nrun\nrunway\nrural\nsad\nsaddle\nsadness\nsafe\nsail\nsalad\nsalmon\nsalon\nsalt\nsalute\nsame\nsample\nsand\nsatisfy\nsatoshi\nsauce\nsausage\nsave\nsay\nscale\nscan\nscare\nscatter\nscene\nscheme\nschool\nscience\nscissors\nscorpion\nscout\nscrap\nscreen\nscript\nscrub\nsea\nsearch\nseason\nseat\nsecond\nsecret\nsection\nsecurity\nseed\nseek\nsegment\nselect\nsell\nseminar\nsenior\nsense\nsentence\nseries\nservice\nsession\nsettle\nsetup\nseven\nshadow\nshaft\nshallow\nshare\nshed\nshell\nsheriff\nshield\nshift\nshine\nship\nshiver\nshock\nshoe\nshoot\nshop\nshort\nshoulder\nshove\nshrimp\nshrug\nshuffle\nshy\nsibling\nsick\nside\nsiege\nsight\nsign\nsilent\nsilk\nsilly\nsilver\nsimilar\nsimple\nsince\nsing\nsiren\nsister\nsituate\nsix\nsize\nskate\nsketch\nski\nskill\nskin\nskirt\nskull\nslab\nslam\nsleep\nslender\nslice\nslide\nslight\nslim\nslogan\nslot\nslow\nslush\nsmall\nsmart\nsmile\nsmoke\nsmooth\nsnack\nsnake\nsnap\nsniff\nsnow\nsoap\nsoccer\nsocial\nsock\nsoda\nsoft\nsolar\nsoldier\nsolid\nsolution\nsolve\nsomeone\nsong\nsoon\nsorry\nsort\nsoul\nsound\nsoup\nsource\nsouth\nspace\nspare\nspatial\nspawn\nspeak\nspecial\nspeed\nspell\nspend\nsphere\nspice\nspider\nspike\nspin\nspirit\nsplit\nspoil\nsponsor\nspoon\nsport\nspot\nspray\nspread\nspring\nspy\nsquare\nsqueeze\nsquirrel\nstable\nstadium\nstaff\nstage\nstairs\nstamp\nstand\nstart\nstate\nstay\nsteak\nsteel\nstem\nstep\nstereo\nstick\nstill\nsting\nstock\nstomach\nstone\nstool\nstory\nstove\nstrategy\nstreet\nstrike\nstrong\nstruggle\nstudent\nstuff\nstumble\nstyle\nsubject\nsubmit\nsubway\nsuccess\nsuch\nsudden\nsuffer\nsugar\nsuggest\nsuit\nsummer\nsun\nsunny\nsunset\nsuper\nsupply\nsupreme\nsure\nsurface\nsurge\nsurprise\nsurround\nsurvey\nsuspect\nsustain\nswallow\nswamp\nswap\nswarm\nswear\nsweet\nswift\nswim\nswing\nswitch\nsword\nsymbol\nsymptom\nsyrup\nsystem\ntable\ntackle\ntag\ntail\ntalent\ntalk\ntank\ntape\ntarget\ntask\ntaste\ntattoo\ntaxi\nteach\nteam\ntell\nten\ntenant\ntennis\ntent\nterm\ntest\ntext\nthank\nthat\ntheme\nthen\ntheory\nthere\nthey\nthing\nthis\nthought\nthree\nthrive\nthrow\nthumb\nthunder\nticket\ntide\ntiger\ntilt\ntimber\ntime\ntiny\ntip\ntired\ntissue\ntitle\ntoast\ntobacco\ntoday\ntoddler\ntoe\ntogether\ntoilet\ntoken\ntomato\ntomorrow\ntone\ntongue\ntonight\ntool\ntooth\ntop\ntopic\ntopple\ntorch\ntornado\ntortoise\ntoss\ntotal\ntourist\ntoward\ntower\ntown\ntoy\ntrack\ntrade\ntraffic\ntragic\ntrain\ntransfer\ntrap\ntrash\ntravel\ntray\ntreat\ntree\ntrend\ntrial\ntribe\ntrick\ntrigger\ntrim\ntrip\ntrophy\ntrouble\ntruck\ntrue\ntruly\ntrumpet\ntrust\ntruth\ntry\ntube\ntuition\ntumble\ntuna\ntunnel\nturkey\nturn\nturtle\ntwelve\ntwenty\ntwice\ntwin\ntwist\ntwo\ntype\ntypical\nugly\numbrella\nunable\nunaware\nuncle\nuncover\nunder\nundo\nunfair\nunfold\nunhappy\nuniform\nunique\nunit\nuniverse\nunknown\nunlock\nuntil\nunusual\nunveil\nupdate\nupgrade\nuphold\nupon\nupper\nupset\nurban\nurge\nusage\nuse\nused\nuseful\nuseless\nusual\nutility\nvacant\nvacuum\nvague\nvalid\nvalley\nvalve\nvan\nvanish\nvapor\nvarious\nvast\nvault\nvehicle\nvelvet\nvendor\nventure\nvenue\nverb\nverify\nversion\nvery\nvessel\nveteran\nviable\nvibrant\nvicious\nvictory\nvideo\nview\nvillage\nvintage\nviolin\nvirtual\nvirus\nvisa\nvisit\nvisual\nvital\nvivid\nvocal\nvoice\nvoid\nvolcano\nvolume\nvote\nvoyage\nwage\nwagon\nwait\nwalk\nwall\nwalnut\nwant\nwarfare\nwarm\nwarrior\nwash\nwasp\nwaste\nwater\nwave\nway\nwealth\nweapon\nwear\nweasel\nweather\nweb\nwedding\nweekend\nweird\nwelcome\nwest\nwet\nwhale\nwhat\nwheat\nwheel\nwhen\nwhere\nwhip\nwhisper\nwide\nwidth\nwife\nwild\nwill\nwin\nwindow\nwine\nwing\nwink\nwinner\nwinter\nwire\nwisdom\nwise\nwish\nwitness\nwolf\nwoman\nwonder\nwood\nwool\nword\nwork\nworld\nworry\nworth\nwrap\nwreck\nwrestle\nwrist\nwrite\nwrong\nyard\nyear\nyellow\nyou\nyoung\nyouth\nzebra\nzero\nzone\nzoo";

    useEffect(async () => {
        setSeedPhraseString(
            [
                wordOne,
                wordTwo,
                wordThree,
                wordFour,
                wordFive,
                wordSix,
                wordSeven,
                wordEight,
                wordNine,
                wordTen,
                wordEleven,
                wordTwelve,
            ].join(" "),
        );
        if (
            !wordOneError &&
            !wordTwoError &&
            !wordThreeError &&
            !wordFourError &&
            !wordFiveError &&
            !wordSixError &&
            !wordSevenError &&
            !wordEightError &&
            !wordNineError &&
            !wordTenError &&
            !wordElevenError &&
            !wordTwelveError
        )
            await checkOnValid();
        else setValidSeedPhrase(false);
    }, [
        wordOne,
        wordTwo,
        wordThree,
        wordFour,
        wordFive,
        wordSix,
        wordSeven,
        wordEight,
        wordNine,
        wordTen,
        wordEleven,
        wordTwelve,
    ]);

    let mnemonicWordsArray = mnemonicWordsRaw.split("\n");
    let mnemonicWords = [];

    mnemonicWordsArray.map((a) => {
        mnemonicWords.push(a);
    });

    let [errorAfterCheck, setErrorAfterCheck] = React.useState(null);

    async function checkOnValid() {
        if (enterSeedPhraseSide === "confirmReg") {
            let sp = [
                wordOne,
                wordTwo,
                wordThree,
                wordFour,
                wordFive,
                wordSix,
                wordSeven,
                wordEight,
                wordNine,
                wordTen,
                wordEleven,
                wordTwelve,
            ].join(" ");
            if (savedSP !== sp) setErrorAfterCheck(true);
            else setErrorAfterCheck(false);
        }
        let res = await client.crypto.mnemonic_verify({
            phrase: [
                wordOne,
                wordTwo,
                wordThree,
                wordFour,
                wordFive,
                wordSix,
                wordSeven,
                wordEight,
                wordNine,
                wordTen,
                wordEleven,
                wordTwelve,
            ].join(" "),
        });
        if (res.valid === true) setValidSeedPhrase(true);
        else setValidSeedPhrase(false);
    }

    async function checkClipboardSeedPhrase(e) {
        let sp = e.clipboardData.getData("text");
        let res = await client.crypto.mnemonic_verify({phrase: sp});
        if (res.valid) {
            let arr = sp.split(" ");
            dispatch(wordOneEnterSeedPhrase(arr[0]));
            dispatch(wordTwoEnterSeedPhrase(arr[1]));
            dispatch(wordThreeEnterSeedPhrase(arr[2]));
            dispatch(wordFourEnterSeedPhrase(arr[3]));
            dispatch(wordFiveEnterSeedPhrase(arr[4]));
            dispatch(wordSixEnterSeedPhrase(arr[5]));
            dispatch(wordSevenEnterSeedPhrase(arr[6]));
            dispatch(wordEightEnterSeedPhrase(arr[7]));
            dispatch(wordNineEnterSeedPhrase(arr[8]));
            dispatch(wordTenEnterSeedPhrase(arr[9]));
            dispatch(wordElevenEnterSeedPhrase(arr[10]));
            dispatch(wordTwelveEnterSeedPhrase(arr[11]));

            setWordOneError(false);
            setWordTwoError(false);
            setWordThreeError(false);
            setWordFourError(false);
            setWordFiveError(false);
            setWordSixError(false);
            setWordSevenError(false);
            setWordEightError(false);
            setWordNineError(false);
            setWordTenError(false);
            setWordElevenError(false);
            setWordTwelveError(false);
            setValidSeedPhrase(true);
        }
    }

    async function genPhrase() {
        let randMnemonic = await client.crypto.mnemonic_from_random({
            word_count: 12,
        });

        let arr = randMnemonic.phrase.split(" ");

        batch(() => {
            dispatch(wordOneEnterSeedPhrase(arr[0]));
            dispatch(wordTwoEnterSeedPhrase(arr[1]));
            dispatch(wordThreeEnterSeedPhrase(arr[2]));
            dispatch(wordFourEnterSeedPhrase(arr[3]));
            dispatch(wordFiveEnterSeedPhrase(arr[4]));
            dispatch(wordSixEnterSeedPhrase(arr[5]));
            dispatch(wordSevenEnterSeedPhrase(arr[6]));
            dispatch(wordEightEnterSeedPhrase(arr[7]));
            dispatch(wordNineEnterSeedPhrase(arr[8]));
            dispatch(wordTenEnterSeedPhrase(arr[9]));
            dispatch(wordElevenEnterSeedPhrase(arr[10]));
            dispatch(wordTwelveEnterSeedPhrase(arr[11]));
        });

        ReactDOM.unstable_batchedUpdates(() => {
            setWordOneError(false);
            setWordTwoError(false);
            setWordThreeError(false);
            setWordFourError(false);
            setWordFiveError(false);
            setWordSixError(false);
            setWordSevenError(false);
            setWordEightError(false);
            setWordNineError(false);
            setWordTenError(false);
            setWordElevenError(false);
            setWordTwelveError(false);
            setValidSeedPhrase(true);
        });
    }

    useMount(async () => {
        if (enterSeedPhraseSide === "login") {
            window.addEventListener("paste", checkClipboardSeedPhrase);
        }
        if (enterSeedPhraseSide === "register") {
            await genPhrase();
            window.addEventListener("paste", checkClipboardSeedPhrase);
        }
        let sp = [
            wordOne,
            wordTwo,
            wordThree,
            wordFour,
            wordFive,
            wordSix,
            wordSeven,
            wordEight,
            wordNine,
            wordTen,
            wordEleven,
            wordTwelve,
        ].join(" ");
        if (sp.length > 12) {
            let res = await client.crypto.mnemonic_verify({phrase: sp});
            if (res.valid === false) return;
            else {
                setWordOneError(false);
                setWordTwoError(false);
                setWordThreeError(false);
                setWordFourError(false);
                setWordFiveError(false);
                setWordSixError(false);
                setWordSevenError(false);
                setWordEightError(false);
                setWordNineError(false);
                setWordTenError(false);
                setWordElevenError(false);
                setWordTwelveError(false);
                setValidSeedPhrase(true);
            }
        }
    });
    useUnmount(() => {
        window.removeEventListener("paste", checkClipboardSeedPhrase);
    });

    const [snackbarOpened, setSnackbarOpened] = React.useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("error");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const [savedSP, setSavedSP] = React.useState("");

    // const [onloadingData, setonloadingData] = React.useState(false);

    function handleDeleteSeeds() {
        dispatch(wordOneEnterSeedPhrase(""));
        dispatch(wordTwoEnterSeedPhrase(""));
        dispatch(wordThreeEnterSeedPhrase(""));
        dispatch(wordFourEnterSeedPhrase(""));
        dispatch(wordFiveEnterSeedPhrase(""));
        dispatch(wordSixEnterSeedPhrase(""));
        dispatch(wordSevenEnterSeedPhrase(""));
        dispatch(wordEightEnterSeedPhrase(""));
        dispatch(wordNineEnterSeedPhrase(""));
        dispatch(wordTenEnterSeedPhrase(""));
        dispatch(wordElevenEnterSeedPhrase(""));
        dispatch(wordTwelveEnterSeedPhrase(""));
    }

    function validationSeeds(verifSeedSetted, verifSeedFromLS) {
        if (!verifSeedSetted.valid) {
            return {valid: false, type: "error", text: "Some error, seed phrase or password not valid, please retry"}
        } else if (!verifSeedFromLS.valid) {
            return {valid: false, type: "error", text: "Some error, decrypted seed phrase not valid, please re-deploy"}
        } else if (verifSeedSetted.valid && verifSeedFromLS.valid && (verifSeedSetted.phrase !== verifSeedFromLS.phrase)) {
            return {valid: false, type: "error", text: "Some error, wrong seed phrase, please retry"}
        } else if (verifSeedSetted.phrase === verifSeedFromLS.phrase) {
            return {valid: true, type: "info", text: "All checks passed, welcome onboard!"}
        }
    }

    function disSetTips(msg, type) {
        dispatch(
            setTips({
                message: msg,
                type: type,
            }),
        );
    }
    const [loadingUserDataIsWaitingSeed, setloadingUserDataIsWaitingSeed] = useState(false);

    useEffect(()=>{console.log("loadingUserDataIsWaitingSeed",loadingUserDataIsWaitingSeed)},[loadingUserDataIsWaitingSeed])


    async function login() {
        let clientDataPreDeployLS = JSON.parse(localStorage.getItem("clientDataPreDeploy"));
        const clientKeys = await getClientKeys(seedPhraseString)
        const existsClientOnRoot = await checkPubKey(clientKeys.public)

        let verifSeedFromLS = await decryptPure(clientDataPreDeployLS.esp, seedPhrasePassword);
        console.log("verifSeedFromLS", verifSeedFromLS, verifSeedFromLS === seedPhraseString)
        const notDeployedClientExists = verifSeedFromLS === seedPhraseString
        const verStatus = await verifySeed(seedPhraseString)
        // const validationSeedRes = validationSeeds(verifSeedSetted,verifSeedFromLS)
        if (!verStatus) {
            disSetTips("Some error, seed phrase or password not valid, please retry", "error")
            return
        }


        // const isPreDeployStatus = clientDataPreDeployLS

        if (validSeedPhrase && validPassword && notDeployedClientExists && !existsClientOnRoot.status) {
            setloadingUserDataIsWaitingSeed(true);
            const dexClientAddress = clientDataPreDeployLS.address
            const dexClientBalance = await getClientBalance(dexClientAddress);
            console.log("i am here")
            dispatch(
                setClientData({
                    status: false,
                    dexclient: dexClientAddress,
                    balance: dexClientBalance,
                    deployed: false,
                }),
            );

            handleDeleteSeeds()
            dispatch(setTransactionsList([]));
            await handleSetEncription()

            dispatch(setWalletIsConnected(false));
            dispatch(showEnterSeedPhrase(false));
            setloadingUserDataIsWaitingSeed(false);
            disSetTips("All checks passed, welcome onboard!", "success")
            history.push("/wallet");

            return
        }


        if (validSeedPhrase && validPassword && existsClientOnRoot.status && !notDeployedClientExists) {


            setloadingUserDataIsWaitingSeed(true);
            // dispatch(setAfterEnterSeedLoading(false))

            handleDeleteSeeds()
            await handleSetEncription()
            await InitializeClient(clientKeys.public)
            disSetTips("All checks passed, welcome onboard!", "success")
            // dispatch(showEnterSeedPhrase(false));

            // dispatch(showEnterSeedPhrase(false));
            setloadingUserDataIsWaitingSeed(false);
            // dispatch(setAfterEnterSeedLoading(true))

            history.push("/wallet");

        } else {
            disSetTips("Something goes wrong, no such client", "error")
        }




    }

    async function continueReg() {
        let sp = [
            wordOne,
            wordTwo,
            wordThree,
            wordFour,
            wordFive,
            wordSix,
            wordSeven,
            wordEight,
            wordNine,
            wordTen,
            wordEleven,
            wordTwelve,
        ].join(" ");
        setSavedSP(sp);
        let arr = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ];
        dispatch(wordOneEnterSeedPhrase(arr[0]));
        dispatch(wordTwoEnterSeedPhrase(arr[1]));
        dispatch(wordThreeEnterSeedPhrase(arr[2]));
        dispatch(wordFourEnterSeedPhrase(arr[3]));
        dispatch(wordFiveEnterSeedPhrase(arr[4]));
        dispatch(wordSixEnterSeedPhrase(arr[5]));
        dispatch(wordSevenEnterSeedPhrase(arr[6]));
        dispatch(wordEightEnterSeedPhrase(arr[7]));
        dispatch(wordNineEnterSeedPhrase(arr[8]));
        dispatch(wordTenEnterSeedPhrase(arr[9]));
        dispatch(wordElevenEnterSeedPhrase(arr[10]));
        dispatch(wordTwelveEnterSeedPhrase(arr[11]));

        setWordOneError(true);
        setWordTwoError(true);
        setWordThreeError(true);
        setWordFourError(true);
        setWordFiveError(true);
        setWordSixError(true);
        setWordSevenError(true);
        setWordEightError(true);
        setWordNineError(true);
        setWordTenError(true);
        setWordElevenError(true);
        setWordTwelveError(true);
        setValidSeedPhrase(false);
        dispatch(setNewSide("confirmReg"));
    }

    async function backToGen() {
        dispatch(setNewSide("register"));
        await genPhrase();
    }

    async function copySeedPhrase() {
        let sp = [
            wordOne,
            wordTwo,
            wordThree,
            wordFour,
            wordFive,
            wordSix,
            wordSeven,
            wordEight,
            wordNine,
            wordTen,
            wordEleven,
            wordTwelve,
        ].join(" ");
        await copyToClipboard(sp);
        return true;
    }

    const [clientPrepData, setclientPrepData] = useState("");
    const [loaderInfo, setLoaderInfo] = useState("");

// ON CREATE
    async function validateSP() {
        let sp = [
            wordOne,
            wordTwo,
            wordThree,
            wordFour,
            wordFive,
            wordSix,
            wordSeven,
            wordEight,
            wordNine,
            wordTen,
            wordEleven,
            wordTwelve,
        ].join(" ");
        let tonvalidate = await client.crypto.mnemonic_verify({phrase: sp});
        if (tonvalidate.valid === true) {
            if (savedSP === sp) {
                setLoaderInfo("Generating client...");
                dispatch(setNewSide("loader"));

                const clientPrepData = await prepareClientDataForDeploy(savedSP);

                console.log("clientPrepData", clientPrepData)
                setclientPrepData(clientPrepData);

                setSeedPhraseString(sp);
                let enc = await encrypt(sp, seedPhrasePassword);
                console.log("sp", sp, "seedPhrasePassword", seedPhrasePassword, "enc", enc)
                dispatch(enterSeedPhraseSaveToLocalStorage(enc));
                dispatch(setNewSide("genClient"));
            }
        }
    }

    const [walletDeployed, setWalletDeployed] = useState(false)

    function ContWithoutRegistr() {

        dispatch(setNewSide("setPassword"));


    }

    function BackFromGenClient() {
        handleDeleteSeeds()

        dispatch(setNewSide("register"));
    }

    const [balanceInsError, setShowInsurricentBalanceError] = useState(false);

    async function deplo() {
        // todo check acc type

        const accBalance = await getClientBalance(clientPrepData.address);
        if (accBalance > 0.5) {
            setLoaderInfo("Creating wallet... Please wait");
            dispatch(setNewSide("loader"));
            const deployRes = await deployClient(
                clientPrepData
            );
            setWalletDeployed(true)
            if (deployRes) {
                dispatch(setNewSide("setPassword"));
            }
        } else {
            setShowInsurricentBalanceError(true);
        }

    }

    const [noClientError, setNoClientError] = useState(false);


    async function handleSetEncription() {
        let encrypted = await encrypt(seedPhraseString, seedPhrasePassword);
        dispatch(setSeedPassword(seedPhrasePassword));
        dispatch(enterSeedPhraseSaveToLocalStorage(encrypted));
    }

    async function goIntoApp() {
        handleDeleteSeeds()

        if (!walletDeployed) {
            const dexClientAddress = clientPrepData.address
            const dexClientBalance = await getClientBalance(dexClientAddress);
            console.log("i am here")
            const data = {
                status: false,
                dexclient: dexClientAddress,
                balance: dexClientBalance,
                deployed: false,
            }
            dispatch(
                setClientData(data),
            );
// 	const extensionWallet = await getWalletExt(
// 		dexClientAddress,
// 		dexClientPublicKey,
// 	);
            dispatch(setTransactionsList([]));
            await handleSetEncription()
            const encClData = await encryptPure(clientPrepData.secret, seedPhrasePassword)
            const encClDataSeed = await encryptPure(seedPhraseString, seedPhrasePassword)


            const encrData = JSON.parse(JSON.stringify(clientPrepData))
            encrData.secret = encClData
            encrData.esp = encClDataSeed
            console.log("encClData", encClData)
            localStorage.setItem("clientDataPreDeploy", JSON.stringify(encrData));
            setSeedPhrasePassword(null)

//
// 	dispatch(setCurExt(extensionWallet[0]));
//
//             getAllPairsAndSetToStore(dexClientAddress);

// 	subscribeClient(dexClientAddress);
// 	subscribeClientBalance(dexClientAddress);
// 	dispatch(showEnterSeedPhrase(false));
// 	dispatch(setSubscribeReceiveTokens([]));
            dispatch(showEnterSeedPhrase(false));
// 	dispatch(setSeedPassword(seedPhrasePassword));
        } else {
            console.log("validSeedPhrase", validSeedPhrase, "validPassword", validPassword);
            if (validSeedPhrase && validPassword) {
                const clientKeys = await getClientKeys(seedPhraseString);
                await InitializeClient(clientKeys.public)
                setSeedPhrasePassword(null)
                dispatch(showEnterSeedPhrase(false));

                await handleSetEncription()

            }
        }
    }



    function enterClick(e) {
        if (e.code === "NumpadEnter" || e.code === "Enter") {
            login();
        }
    }

    function getTitle(side) {
        if (side === "login") return `Enter seed phrase`;
        else if (side === "register")
            return (
                <div
                    style={{
                        marginLeft: "20px",
                        fontSize: "22px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div>How to create wallet:</div>
                    <div>
                        Step 1/3:
                        <br/>
                        Please back up your seed phrase safely
                    </div>
                </div>
            );
        else if (side === "confirmation")
            return (
                <div style={{marginLeft: "20px", fontSize: "22px"}}>
                    Enter Seed Phrase from the previous step
                </div>
            );
        else if (side === "confirmReg")
            return (
                <div style={{marginLeft: "20px", fontSize: "22px"}}>
                    Step 2/3:
                    <br/>
                    Enter seed phrase from the previous step
                </div>
            );
        else if (side === "genClient")
            return (
                <div style={{marginLeft: "20px", fontSize: "22px"}}>
                    Step 3/3:
                    <br/> Top up your wallet for activation
                </div>
            );
    }

    function passwordChange(event) {
        let password = event.target.value;
        if (password.length > 0) setValidPassword(true);
        setSeedPhrasePassword(password);
    }

    const snackbarHandleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpened(false);
    };

    const CssTextField = styled(TextField)({
        "& .MuiOutlinedInput-input": {
            color: "var(--primary-color)",
        },
    });

    return (
        <div className="select-wrapper">
            {loadingUserDataIsWaitingSeed ? (
                <WaitingPopup
                    title={"Connecting to blockchain"}
                    text={`Loading user data...`}
                    hide={true}
                />
            ) : (
                <MainBlock
                    title={getTitle(enterSeedPhraseSide)}
                    classHeader={"fixFontSize"}
                    classTitle={"fixFontSize"}
                    class={
                        enterSeedPhraseSide === "login" ||
                        enterSeedPhraseSide === "register" ||
                        enterSeedPhraseSide === "confirmReg"
                            ? "fixheight big"
                            : "fixheight"
                    }
                    button={
                        (enterSeedPhraseSide === "login" ||
                            enterSeedPhraseSide === "register" ||
                            enterSeedPhraseSide === "confirmReg") && (
                            <CloseBtn width={"16px"} height={"16px"} func={handleClose}/>
                        )
                    }
                    content={
                        <>
                            {enterSeedPhraseSide === "login" && (
                                <>
                                    <Grid container spacing={3} sx={{justifyContent: "center"}}>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-one"
                                                label="Word 1"
                                                options={mnemonicWords}
                                                value={wordOne}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordOneError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordOneError(false);
                                                    else setWordOneError(true);
                                                    dispatch(wordOneEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordOneError}
                                                        label="Word 1"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-two"
                                                label="Word 2"
                                                options={mnemonicWords}
                                                value={wordTwo}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTwoError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTwoError(false);
                                                    else setWordTwoError(true);
                                                    dispatch(wordTwoEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTwoError}
                                                        label="Word 2"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-three"
                                                label="Word 3"
                                                options={mnemonicWords}
                                                value={wordThree}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordThreeError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordThreeError(false);
                                                    else setWordThreeError(true);
                                                    dispatch(wordThreeEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordThreeError}
                                                        label="Word 3"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-four"
                                                label="Word 4"
                                                options={mnemonicWords}
                                                value={wordFour}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordFourError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordFourError(false);
                                                    else setWordFourError(true);
                                                    dispatch(wordFourEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordFourError}
                                                        label="Word 4"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-five"
                                                label="Word 5"
                                                options={mnemonicWords}
                                                value={wordFive}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordFiveError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordFiveError(false);
                                                    else setWordFiveError(true);
                                                    dispatch(wordFiveEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordFiveError}
                                                        label="Word 5"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-six"
                                                label="Word 6"
                                                options={mnemonicWords}
                                                value={wordSix}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordSixError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordSixError(false);
                                                    else setWordSixError(true);
                                                    dispatch(wordSixEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordSixError}
                                                        label="Word 6"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-seven"
                                                label="Word 7"
                                                options={mnemonicWords}
                                                value={wordSeven}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordSevenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordSevenError(false);
                                                    else setWordSevenError(true);
                                                    dispatch(wordSevenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordSevenError}
                                                        label="Word 7"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-eight"
                                                label="Word 8"
                                                options={mnemonicWords}
                                                value={wordEight}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordEightError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordEightError(false);
                                                    else setWordEightError(true);
                                                    dispatch(wordEightEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordEightError}
                                                        label="Word 8"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-nine"
                                                label="Word 9"
                                                options={mnemonicWords}
                                                value={wordNine}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordNineError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordNineError(false);
                                                    else setWordNineError(true);
                                                    dispatch(wordNineEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordNineError}
                                                        label="Word 9"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-ten"
                                                label="Word 10"
                                                options={mnemonicWords}
                                                value={wordTen}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTenError(false);
                                                    else setWordTenError(true);
                                                    dispatch(wordTenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTenError}
                                                        label="Word 10"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-eleven"
                                                label="Word 11"
                                                options={mnemonicWords}
                                                value={wordEleven}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordElevenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordElevenError(false);
                                                    else setWordElevenError(true);
                                                    dispatch(wordElevenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordElevenError}
                                                        label="Word 11"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-twelve"
                                                label="Word 12"
                                                options={mnemonicWords}
                                                value={wordTwelve}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTwelveError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTwelveError(false);
                                                    else setWordTwelveError(true);
                                                    dispatch(wordTwelveEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTwelveError}
                                                        label="Word 12"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <Alert
                                            severity={!validSeedPhrase ? "error" : "success"}
                                            sx={{width: "100%"}}
                                        >
                                            <AlertTitle>
                                                {!validSeedPhrase
                                                    ? "Seed phrase invalid"
                                                    : "Seed phrase valid"}
                                            </AlertTitle>
                                            {!validSeedPhrase
                                                ? "The seed phrase is currently incorrect."
                                                : "It remains to enter the Encryption password to complete the wallet setup."}
                                        </Alert>
                                    </Box>
                                    {noClientError ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "24px",
                                            }}
                                        >
                                            <Alert severity={"warning"} sx={{width: "100%"}}>
                                                <AlertTitle>{"Client not exists"}</AlertTitle>
                                                {
                                                    "There is no DEX client smart contract with such pubkey registered on DEX, please check your seed phrase or create new client."
                                                }
                                            </Alert>
                                        </Box>
                                    ) : null}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <TextField
                                            label="Encryption password"
                                            error={!validPassword}
                                            sx={{width: "100%"}}
                                            placeholder={
                                                "Your password"
                                            }
                                            type="password"
                                            onChange={passwordChange}
                                            value={seedPhrasePassword}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <Alert severity="info">
                                            <AlertTitle>Hint</AlertTitle>
                                            You can paste seed phrase into page (Ctrl + V), and the
                                            fields will be automatically filled
                                        </Alert>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <Alert severity="warning">
                                            <AlertTitle>Security policy</AlertTitle>
                                            Your password is the key to decrypting the seed phrase!
                                            Please make sure that this password is only used for this
                                            service. DefiSpace does not store your password and seed
                                            phrase on the remote server. The encrypted string with the
                                            seed phrase is stored in your computer's browser storage.
                                            DefiSpace service <strong>cannot decrypt</strong> it
                                            without knowing the password.
                                        </Alert>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <button
                                            style={{fontSize: "24px"}}
                                            onClick={login}
                                            className="btn wallet-btn"
                                        >
                                            Log in
                                        </button>
                                    </Box>
                                </>
                            )}
                            {enterSeedPhraseSide === "register" && (
                                <>
                                    <Grid container spacing={3} sx={{justifyContent: "center"}}>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-one"
                                                label="Word 1"
                                                // disabled
                                                options={mnemonicWords}
                                                value={wordOne}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordOneError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordOneError(false);
                                                    else setWordOneError(true);
                                                    dispatch(wordOneEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                color={"var(--primary-color)"}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordOneError}
                                                        label="Word 1"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-two"
                                                label="Word 2"
                                                options={mnemonicWords}
                                                // disabled
                                                value={wordTwo}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTwoError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTwoError(false);
                                                    else setWordTwoError(true);
                                                    dispatch(wordTwoEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTwoError}
                                                        label="Word 2"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-three"
                                                label="Word 3"
                                                options={mnemonicWords}
                                                // disabled
                                                value={wordThree}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordThreeError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordThreeError(false);
                                                    else setWordThreeError(true);
                                                    dispatch(wordThreeEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordThreeError}
                                                        label="Word 3"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-four"
                                                label="Word 4"
                                                options={mnemonicWords}
                                                value={wordFour}
                                                // disabled
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordFourError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordFourError(false);
                                                    else setWordFourError(true);
                                                    dispatch(wordFourEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordFourError}
                                                        label="Word 4"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-five"
                                                label="Word 5"
                                                options={mnemonicWords}
                                                // disabled
                                                value={wordFive}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordFiveError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordFiveError(false);
                                                    else setWordFiveError(true);
                                                    dispatch(wordFiveEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordFiveError}
                                                        label="Word 5"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-six"
                                                label="Word 6"
                                                options={mnemonicWords}
                                                value={wordSix}
                                                // disabled
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordSixError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordSixError(false);
                                                    else setWordSixError(true);
                                                    dispatch(wordSixEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordSixError}
                                                        label="Word 6"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-seven"
                                                label="Word 7"
                                                options={mnemonicWords}
                                                value={wordSeven}
                                                // disabled
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordSevenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordSevenError(false);
                                                    else setWordSevenError(true);
                                                    dispatch(wordSevenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordSevenError}
                                                        label="Word 7"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-eight"
                                                label="Word 8"
                                                options={mnemonicWords}
                                                // disabled
                                                value={wordEight}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordEightError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordEightError(false);
                                                    else setWordEightError(true);
                                                    dispatch(wordEightEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordEightError}
                                                        label="Word 8"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-nine"
                                                label="Word 9"
                                                options={mnemonicWords}
                                                // disabled
                                                value={wordNine}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordNineError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordNineError(false);
                                                    else setWordNineError(true);
                                                    dispatch(wordNineEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordNineError}
                                                        label="Word 9"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-ten"
                                                label="Word 10"
                                                options={mnemonicWords}
                                                // disabled
                                                value={wordTen}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTenError(false);
                                                    else setWordTenError(true);
                                                    dispatch(wordTenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTenError}
                                                        label="Word 10"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-eleven"
                                                label="Word 11"
                                                options={mnemonicWords}
                                                // disabled
                                                value={wordEleven}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordElevenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordElevenError(false);
                                                    else setWordElevenError(true);
                                                    dispatch(wordElevenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordElevenError}
                                                        label="Word 11"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-twelve"
                                                label="Word 12"
                                                options={mnemonicWords}
                                                // disabled
                                                value={wordTwelve}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTwelveError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTwelveError(false);
                                                    else setWordTwelveError(true);
                                                    dispatch(wordTwelveEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTwelveError}
                                                        label="Word 12"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <Alert severity={"warning"} sx={{width: "100%"}}>
                                            <AlertTitle>Important information</AlertTitle>
                                            It is very important to keep the seed phrase. It cannot be
                                            restored. The DefiSpace service does not store the seed
                                            phrase, and will not be able to help if it is lost.
                                            Remember this.
                                        </Alert>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <Grid container className={"enterSPRegBox"} spacing={2}>
                                            <Grid item>
                                                <button
                                                    style={{fontSize: "16px"}}
                                                    onClick={genPhrase}
                                                    className="btn wallet-btn"
                                                >
                                                    Re-create seed phrase
                                                </button>
                                            </Grid>
                                            <Grid item>
                                                <button
                                                    style={{fontSize: "16px"}}
                                                    onClick={continueReg}
                                                    className="btn wallet-btn"
                                                >
                                                    Continue
                                                </button>
                                            </Grid>
                                            <Grid item>
                                                <button
                                                    style={{fontSize: "16px"}}
                                                    onClick={copySeedPhrase}
                                                    className="btn wallet-btn"
                                                >
                                                    Copy
                                                </button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                            )}
                            {enterSeedPhraseSide === "confirmReg" && (
                                <>
                                    <Grid container spacing={3} sx={{justifyContent: "center"}}>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-one"
                                                label="Word 1"
                                                options={mnemonicWords}
                                                value={wordOne}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordOneError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordOneError(false);
                                                    else setWordOneError(true);
                                                    dispatch(wordOneEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordOneError}
                                                        label="Word 1"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-two"
                                                label="Word 2"
                                                options={mnemonicWords}
                                                value={wordTwo}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTwoError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTwoError(false);
                                                    else setWordTwoError(true);
                                                    dispatch(wordTwoEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTwoError}
                                                        label="Word 2"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-three"
                                                label="Word 3"
                                                options={mnemonicWords}
                                                value={wordThree}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordThreeError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordThreeError(false);
                                                    else setWordThreeError(true);
                                                    dispatch(wordThreeEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordThreeError}
                                                        label="Word 3"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-four"
                                                label="Word 4"
                                                options={mnemonicWords}
                                                value={wordFour}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordFourError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordFourError(false);
                                                    else setWordFourError(true);
                                                    dispatch(wordFourEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordFourError}
                                                        label="Word 4"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-five"
                                                label="Word 5"
                                                options={mnemonicWords}
                                                value={wordFive}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordFiveError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordFiveError(false);
                                                    else setWordFiveError(true);
                                                    dispatch(wordFiveEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordFiveError}
                                                        label="Word 5"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-six"
                                                label="Word 6"
                                                options={mnemonicWords}
                                                value={wordSix}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordSixError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordSixError(false);
                                                    else setWordSixError(true);
                                                    dispatch(wordSixEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordSixError}
                                                        label="Word 6"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-seven"
                                                label="Word 7"
                                                options={mnemonicWords}
                                                value={wordSeven}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordSevenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordSevenError(false);
                                                    else setWordSevenError(true);
                                                    dispatch(wordSevenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordSevenError}
                                                        label="Word 7"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-eight"
                                                label="Word 8"
                                                options={mnemonicWords}
                                                value={wordEight}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordEightError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordEightError(false);
                                                    else setWordEightError(true);
                                                    dispatch(wordEightEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordEightError}
                                                        label="Word 8"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-nine"
                                                label="Word 9"
                                                options={mnemonicWords}
                                                value={wordNine}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordNineError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordNineError(false);
                                                    else setWordNineError(true);
                                                    dispatch(wordNineEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordNineError}
                                                        label="Word 9"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-ten"
                                                label="Word 10"
                                                options={mnemonicWords}
                                                value={wordTen}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTenError(false);
                                                    else setWordTenError(true);
                                                    dispatch(wordTenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTenError}
                                                        label="Word 10"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-eleven"
                                                label="Word 11"
                                                options={mnemonicWords}
                                                value={wordEleven}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordElevenError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordElevenError(false);
                                                    else setWordElevenError(true);
                                                    dispatch(wordElevenEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordElevenError}
                                                        label="Word 11"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                id="seed-phrase-word-twelve"
                                                label="Word 12"
                                                options={mnemonicWords}
                                                value={wordTwelve}
                                                onChange={(event, newValue) => {
                                                    if (newValue === null) setWordTwelveError(true);
                                                    else if (mnemonicWords.indexOf(newValue) !== -1)
                                                        setWordTwelveError(false);
                                                    else setWordTwelveError(true);
                                                    dispatch(wordTwelveEnterSeedPhrase(newValue));
                                                }}
                                                getOptionLabel={(option) => option}
                                                sx={{width: 160}}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        error={wordTwelveError}
                                                        label="Word 12"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "24px",
                                        }}
                                    >
                                        <Alert
                                            severity={!validSeedPhrase ? "error" : "success"}
                                            sx={{width: "100%"}}
                                        >
                                            <AlertTitle>
                                                {!validSeedPhrase
                                                    ? "Seed phrase invalid"
                                                    : "Seed phrase valid"}
                                            </AlertTitle>
                                            {!validSeedPhrase
                                                ? "The seed phrase is currently incorrect."
                                                : "Seed phrase valid. You can create DexWallet"}
                                        </Alert>
                                    </Box>

                                    <div
                                        style={{display: "flex", justifyContent: "space-around"}}
                                        className={"enterSPContent"}
                                    >
                                        {(errorAfterCheck === true || errorAfterCheck === null) && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    marginTop: "24px",
                                                }}
                                            >
                                                <button
                                                    style={{fontSize: "24px"}}
                                                    onClick={backToGen}
                                                    className="btn wallet-btn"
                                                >
                                                    Back
                                                </button>
                                            </Box>
                                        )}
                                        {/*{errorAfterCheck === false &&*/}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "24px",
                                            }}
                                        >
                                            <button
                                                style={{fontSize: "24px"}}
                                                onClick={validateSP}
                                                className="btn wallet-btn"
                                            >
                                                Generate wallet
                                            </button>
                                        </Box>
                                    </div>
                                    {/*}*/}
                                </>
                            )}
                            {enterSeedPhraseSide === "genClient" && (
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{justifyContent: "center", marginLeft: "0px"}}
                                >
                                    <Box
                                        sx={{
                                            marginTop: "24px",
                                            width: "100%",
                                            marginLeft: "20px",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        Please send 2 or more TON to this address:{" "}
                                        <strong
                                            className={"textOnHover"}
                                            onClick={() =>
                                                copyToClipboard(clientPrepData.address)
                                            }
                                        >
                                            {clientPrepData.address
                                                ? handleCutAddress(clientPrepData.address)
                                                : "default"}
                                        </strong>
                                        , and click "Create wallet".<br/><br/>
                                        Also, you can fill up your wallet later if you want - click "Continue to
                                        wallet".
                                    </Box>

                                    {balanceInsError && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "24px",
                                                width: "100%",
                                                flexDirection: "column",
                                            }}
                                        >
                                            TONs not received, please try again or wait one minute.
                                        </Box>
                                    )}
                                    <div className={"enterSPBox"}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                // marginTop: "24px",
                                            }}
                                        >
                                            <button
                                                style={{fontSize: "15px"}}
                                                onClick={BackFromGenClient}
                                                className="btn wallet-btn"
                                            >
                                                Back
                                            </button>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                // marginTop: "24px",
                                            }}
                                        >


                                            <button
                                                style={{fontSize: "15px"}}
                                                onClick={ContWithoutRegistr}
                                                className="btn wallet-btn"
                                            >
                                                Continue to wallet
                                            </button>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                // marginTop: "24px",
                                            }}
                                        >
                                            <button
                                                style={{fontSize: "15px"}}
                                                onClick={() =>
                                                    copyToClipboard(clientPrepData.address)
                                                }
                                                className="btn wallet-btn"
                                            >
                                                Copy address
                                            </button>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                // marginTop: "24px",
                                            }}
                                        >
                                            <button
                                                style={{fontSize: "15px"}}
                                                onClick={deplo}
                                                className="btn wallet-btn"
                                            >
                                                Create wallet
                                            </button>
                                        </Box>
                                    </div>
                                </Grid>
                            )}
                            {enterSeedPhraseSide === "setPassword" &&
                            <PasswordEnterPopup
                                goIntoApp={goIntoApp}
                                enterClick={enterClick}
                                passwordChange={passwordChange}
                                validPassword={validPassword}
                                submitText={"Set Password for your Wallet"}
                                cancelText={null}
                                handleBack={null}
                            />
                            }
                            {enterSeedPhraseSide === "loader" && (
                                <div>
                                    <Loader/>
                                    <div style={{textAlign: "center", marginTop: "70px"}}>
                                        {loaderInfo}
                                    </div>
                                </div>
                            )}
                        </>
                    }
                />
            )}
        </div>
        // document.querySelector('body')
    );
}

export default EnterSeedPhrase;
