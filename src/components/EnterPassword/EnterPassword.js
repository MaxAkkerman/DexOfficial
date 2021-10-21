import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MainBlock from "../MainBlock/MainBlock";
import "./EnterPassword.scss";
import client, {
    agregateQueryNFTassets,
    checkPubKey,
    getClientBalance,
    getClientKeys,
    subscribeClient,
    subscribeClientBalance,
} from "../../extensions/webhook/script";
import {decrypt, encrypt} from "../../extensions/seedPhrase";
import {
    enterSeedPhraseSaveToLocalStorage,
    hideEnterSeedPhraseUnlock,
    setSeedPassword,
} from "../../store/actions/enterSeedPhrase";
import {
    Alert,
    AlertTitle,
    Box,
    Grid,
    Snackbar,
    TextField,
} from "@material-ui/core";
import {
    setClientData,
    setSubscribeReceiveTokens, setTransactionsList,
} from "../../store/actions/wallet";
import {getWalletExt} from "../../extensions/extensions/checkExtensions";
import {setCurExt, setTips, setWalletIsConnected} from "../../store/actions/app";
import {
    getAllPairsAndSetToStore,
    getAllTokensAndSetToStore, InitializeClient,
} from "../../reactUtils/reactUtils";
import WaitingPopup from "../WaitingPopup/WaitingPopup";
import styled from "@emotion/styled";
import {store} from "../../index";

function EnterPassword(props) {
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
        return dispatch(hideEnterSeedPhraseUnlock());
    }

    const [seedPhraseString, setSeedPhraseString] = useState(``);
    const [validSeedPhrase, setValidSeedPhrase] = useState(false);
    const [seedPhrasePassword, setSeedPhrasePassword] = useState(``);
    const [validPassword, setValidPassword] = useState(false);
    const encryptedSeedPhrase = useSelector(
        (state) => state.enterSeedPhrase.encryptedSeedPhrase,
    );
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

    async function checkOnValid() {
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
    }

    const [snackbarOpened, setSnackbarOpened] = React.useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("error");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const [decryptResult, setDecryptResult] = React.useState(null);

    function enterClick(e) {
        if (e.code === "NumpadEnter" || e.code === "Enter") {
            login();
        }
    }

    async function login(e) {

        let esp = localStorage.getItem("esp");
        let clientDataLS = JSON.parse(localStorage.getItem("clientData"));

        let decrypted = await decrypt(esp, seedPhrasePassword);
        const clientKeys = await getClientKeys(decrypted.phrase);


        if (decrypted.valid === false) {
            setDecryptResult(false);
            dispatch(
                setTips({
                    message: `Something goes wrong - invalid password`,
                    type: "error",
                }),
            );
        }
        if (decrypted.valid === true) {
            setloadingUserDataIsWaiting(true);
            setDecryptResult(true);

            console.log("clientDataLS", clientDataLS, "clientDataLS.address", clientDataLS.address, "clientDataLS.status", clientDataLS.status)
            if (!clientDataLS.status && clientDataLS.dexclient) {
                const dexClientAddress = clientDataLS.dexclient
                const dexClientBalance = await getClientBalance(dexClientAddress);
                console.log("i am here")
                dispatch(
                    setClientData({
                        status: false,
                        dexclient: dexClientAddress,
                        balance: dexClientBalance,
                        public: clientKeys.public,
                    }),
                );
                dispatch(setTransactionsList([]));

                dispatch(setSeedPassword(seedPhrasePassword));


                setloadingUserDataIsWaiting(false);
                dispatch(hideEnterSeedPhraseUnlock());
                history.push("/wallet");
                return

            }


            await InitializeClient(clientKeys.public)
            dispatch(setSeedPassword(seedPhrasePassword));


            const receiveTokensData = JSON.parse(localStorage.getItem("setSubscribeReceiveTokens"));
            if (receiveTokensData) {dispatch(setSubscribeReceiveTokens(receiveTokensData))}

            setSeedPhraseString("");
        }
        setloadingUserDataIsWaiting(false);
        dispatch(hideEnterSeedPhraseUnlock());
        history.push("/wallet");
    }




function getTitle(side) {
    if (side === "login") return `Enter seed phrase`;
    else if (side === "register")
        return `Please back up your seed phrase safely`;
    else if (side === "confirmation")
        return `Enter Seed Phrase from the previous step `;
}

function passwordChange(event) {
    let password = event.target.value;
    if (password.length > 0) setValidPassword(true);
    else setDecryptResult(null);
    setSeedPhrasePassword(password);
}

function clear() {
    localStorage.removeItem("esp");
    localStorage.removeItem("setSubscribeReceiveTokens");
    window.location.reload();
}

const snackbarHandleClose = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }

    setSnackbarOpened(false);
};

const [loadingUserDataIsWaiting, setloadingUserDataIsWaiting] =
    useState(false);

const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-input": {
        "&.Mui-disabled": {
            color: "var(--text-color)",
            "-webkit-text-fill-color": "unset",
        },
        color: "var(--text-color)",
    },
    "& .Mui-disabled": {
        color: "var(--text-color)",
    },
});

return (
    <div className="select-wrapper">
        {loadingUserDataIsWaiting ? (
            <WaitingPopup
                hide={true}
                title={"Connecting to blockchain"}
                text={`Loading user data...`}
            />
        ) : (
            <MainBlock
                title={"Unlock your wallet"}
                content={
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "24px",
                            }}
                        >
                            <CssTextField
                                label="Decryption password"
                                error={!validPassword}
                                placeholder={
                                    "Your seed phrase will be decrypted with this password"
                                }
                                type="password"
                                onChange={passwordChange}
                                inputRef={(input) => {
                                    if (input != null) {
                                        input.focus();
                                    }
                                }}
                                value={seedPhrasePassword}
                                onKeyDown={enterClick}
                                autoFocus
                                sx={{
                                    width: "100%",
                                    "&:focus": {
                                        color: "var(--text-color) !important",
                                        outlineColor: "var(--text-color) !important",
                                        borderColor: "var(--text-color) !important",
                                    },
                                    "::placeholder": {
                                        color: "var(--text-color) !important",
                                    },
                                    color: "var(--text-color) !important",
                                    outlineColor: "var(--text-color) !important",
                                    borderColor: "var(--text-color) !important",
                                }}
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
                                <AlertTitle>Security policy</AlertTitle>
                                <strong>DefiSpace does not store your password.</strong>
                                <br/>
                                It is used exclusively for local decryption of the seed phrase
                                stored in the browser storage.
                            </Alert>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "24px",
                            }}
                        >
                            <Alert
                                style={{width: "100%"}}
                                severity={
                                    (decryptResult === null && "info") ||
                                    (decryptResult === false && "error") ||
                                    (decryptResult === true && "success")
                                }
                            >
                                <AlertTitle>
                                    {(decryptResult === null && "Wait to unlock") ||
                                    (decryptResult === false && "Incorrect password") ||
                                    (decryptResult === true && "All right")}
                                </AlertTitle>
                                {(decryptResult === null &&
                                    "Please, enter your password and click the button below.") ||
                                (decryptResult === false &&
                                    "Oh! You're enter incorrect password! Try enter again or Clear your saved account.") ||
                                (decryptResult === true &&
                                    "Yeah! Your wallet have been unlocked! Please wait, we check additional information. Be patient.")}
                            </Alert>
                        </Box>
                        <div className={"EnterPassword_buttons_container"}>
                            <div className={"EnterPassword_buttons"}>
                                <div className={"EnterPassword_full_width margint"}>
                                    <button
                                        style={{fontSize: "24px"}}
                                        onClick={clear}
                                        className="btn-error wallet-btn unlock"
                                    >
                                        Log out and Delete
                                    </button>
                                </div>

                                <div className={"EnterPassword_full_width"}>
                                    <button
                                        style={{fontSize: "24px"}}
                                        onClick={login}
                                        className="btn wallet-btn unlock"
                                    >
                                        Unlock
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            />
        )}
    </div>
);
//     document.querySelector('body')
// );
}

export default EnterPassword;
