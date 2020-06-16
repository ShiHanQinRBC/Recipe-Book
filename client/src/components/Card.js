import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.fakeURLS = {
      17875383178704482: "https://scontent.cdninstagram.com/v/t51.2885-15/102955960_741688369914056_6509399265736205313_n.jpg?_nc_cat=101&_nc_sid=8ae9d6&_nc_ohc=z8IH98SU5moAX9vStlW&_nc_ht=scontent.cdninstagram.com&oh=4ab25b81c0e4103703d31547c21493ca&oe=5F08084C",
      17845770359152224: "https://scontent.cdninstagram.com/v/t51.2885-15/101058604_107800230848848_3955867387598675943_n.jpg?_nc_cat=109&_nc_sid=8ae9d6&_nc_ohc=LtXqbkcTsLwAX8YU4nb&_nc_ht=scontent.cdninstagram.com&oh=0ef0c5ca9fef5ac5dcd38826ecb55609&oe=5F07003B",
      17847414839129299: "https://scontent.cdninstagram.com/v/t51.2885-15/100955186_158607965797189_6778942453506911128_n.jpg?_nc_cat=111&_nc_sid=8ae9d6&_nc_ohc=oeU5qpvSks4AX8bLl_K&_nc_ht=scontent.cdninstagram.com&oh=760e78c980560ccd170a2a23c7f474f9&oe=5F0700E9",
      17868739402771567: "https://scontent.cdninstagram.com/v/t51.2885-15/100892083_1012778599117468_5921713814154008160_n.jpg?_nc_cat=103&_nc_sid=8ae9d6&_nc_ohc=ATZ9q1G7Qu4AX_QrhM2&_nc_ht=scontent.cdninstagram.com&oh=ffe24df13b5f8cbace850b867481810c&oe=5F06E735",
      17842864076184710: "https://scontent.cdninstagram.com/v/t51.2885-15/97902468_3202301213134573_2996368502359656374_n.jpg?_nc_cat=101&_nc_sid=8ae9d6&_nc_ohc=T8iEFB_EgWYAX-mtkw4&_nc_ht=scontent.cdninstagram.com&oh=4f4171376dfce29f58c909f7e72e95db&oe=5F07597D",
      17856741808932721: "https://scontent.cdninstagram.com/v/t51.2885-15/96291203_130790008578854_3791485511893523772_n.jpg?_nc_cat=105&_nc_sid=8ae9d6&_nc_ohc=y-o954cHi2YAX8hpg6x&_nc_ht=scontent.cdninstagram.com&oh=82ba35ee73e6de165a165a76026ef8cb&oe=5F0726B4",
      17919702697405913: "https://scontent.cdninstagram.com/v/t51.2885-15/96168202_3777141559023806_2974510472598467359_n.jpg?_nc_cat=109&_nc_sid=8ae9d6&_nc_ohc=af-LNBN5-GwAX_iTv-L&_nc_ht=scontent.cdninstagram.com&oh=534483c11a7491da270e666862faee9a&oe=5F065FD8",
      17859801478881923: "https://scontent.cdninstagram.com/v/t51.2885-15/95298799_670988456998041_5808694674303318951_n.jpg?_nc_cat=100&_nc_sid=8ae9d6&_nc_ohc=UiUwXL8wgZwAX8ttHnY&_nc_ht=scontent.cdninstagram.com&oh=5f08577886883893a799b723baf55f34&oe=5F057C32",
      17865305950774682: "https://scontent.cdninstagram.com/v/t51.2885-15/94103022_2749724838644245_52042402596388024_n.jpg?_nc_cat=105&_nc_sid=8ae9d6&_nc_ohc=V76fWBdVOecAX8_KYWK&_nc_ht=scontent.cdninstagram.com&oh=0f52103fc5432041ccfd95d868f0d242&oe=5F07F6F4",
      18085468735172804: "https://scontent.cdninstagram.com/v/t51.2885-15/93776496_2968362216545429_741023883981601342_n.jpg?_nc_cat=104&_nc_sid=8ae9d6&_nc_ohc=KquZ6iOHKWgAX8cRGav&_nc_ht=scontent.cdninstagram.com&oh=6c9cab36490892dba28d477c45f1f07b&oe=5F063CDC",
      17903575093443886: "https://scontent.cdninstagram.com/v/t51.2885-15/93331130_542241923332641_3900624062808811517_n.jpg?_nc_cat=107&_nc_sid=8ae9d6&_nc_ohc=_s78b1WPaBAAX8N2APz&_nc_ht=scontent.cdninstagram.com&oh=006397b479719b289ba783532d8d6eb6&oe=5F07C968",
      17844801437081768: "https://scontent.cdninstagram.com/v/t51.2885-15/92747621_223634788725075_7069227902842359969_n.jpg?_nc_cat=109&_nc_sid=8ae9d6&_nc_ohc=VtkU3f9DAJYAX-pwbNE&_nc_ht=scontent.cdninstagram.com&oh=e96bd5ec8a182551f049f4db839c2af8&oe=5F08A485",
      17853111556908962: "https://scontent.cdninstagram.com/v/t51.2885-15/93062014_505786636755567_2227137999306344487_n.jpg?_nc_cat=108&_nc_sid=8ae9d6&_nc_ohc=ZBPoMtmoYzEAX88aRQn&_nc_ht=scontent.cdninstagram.com&oh=858a49abedb13e4c3c141259386a77ab&oe=5F08259D",
      17860294555791529: "https://scontent.cdninstagram.com/v/t51.2885-15/91806382_305869673708073_7956415662184323411_n.jpg?_nc_cat=110&_nc_sid=8ae9d6&_nc_ohc=ZGyGQMyXJfYAX_UVL3F&_nc_ht=scontent.cdninstagram.com&oh=2cc6b5f06cab2a4a096348aa5a251843&oe=5F063C98",
      18109425730118069: "https://scontent.cdninstagram.com/v/t51.2885-15/91032833_711359023004959_343052449275451120_n.jpg?_nc_cat=110&_nc_sid=8ae9d6&_nc_ohc=ni8PRtAl2oYAX9raAzo&_nc_ht=scontent.cdninstagram.com&oh=460a6a05de5737e3d73577b8ac6dfd9a&oe=5F07F65E",
      18093346045178456: "https://video.fyyz1-1.fna.fbcdn.net/v/t50.2886-16/90333599_217118966061007_4962030709228247546_n.mp4?_nc_cat=104&vs=17895824332457699_2639721943&_nc_vs=HBksFQAYJEdKOWhZZ1hQbDlqeWQ4VUFBUG9aSWR5anJOeEVia1lMQUFBRhUAAsgBABUAGCRHR0NyYUFWNkpSNTUtYWtGQU5qVFc3SnNjYnRCYmtZTEFBQUYVAgLIAQAoABgAGwGIB3VzZV9vaWwBMRUAABgAFsbIvc\u00252BIiso\u00252FFQIoAkMzLBdATdmZmZmZmhgSZGFzaF9iYXNlbGluZV8xX3YxEQB16gcA&_nc_sid=59939d&efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjcyMC5mZWVkIn0\u00253D&_nc_ohc=A73TsAxMwFMAX9tAVM6&_nc_ht=video.fyyz1-1.fna&oh=05506b1c95b6ce4e21d5d6911df0c6b7&oe=5F06F84E&_nc_rid=2378a1d2d3",
      17869324438631997: "https://scontent.cdninstagram.com/v/t51.2885-15/90955695_1260118644189960_6780358776000930098_n.jpg?_nc_cat=100&_nc_sid=8ae9d6&_nc_ohc=JGqDyTpf-UYAX_s5tIS&_nc_ht=scontent.cdninstagram.com&oh=ea9b580649d050ac04a0ba143adb3eec&oe=5F0702FA",
      17869433827654780: "https://scontent.cdninstagram.com/v/t51.2885-15/91025805_163396694765955_4707740657563968968_n.jpg?_nc_cat=104&_nc_sid=8ae9d6&_nc_ohc=EBs3GFsROacAX9U82S8&_nc_ht=scontent.cdninstagram.com&oh=6340a041244f6b2f1ac709007be47c89&oe=5F076E4E",
    };
    this.state = {
      url: "",
    };
  }

  getPictureURL = async (id) => {
    const picURL =
      "https://graph.instagram.com/" +
      id +
      "?fields=media_type,media_url,username,timestamp&access_token=" +
      this.props.accessToken;

    try {
      const res = await axios.get(picURL);
      console.log(res.data.media_url);
      this.setState({ url: res.data.media_url });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    //this.getPictureURL(this.props.id);
    //console.log(this.state);
    const { id } = this.props;
    //console.log(this.props);
    console.log(this.props);
    return (
      <div>
        {/* <h2>Post {this.props.id}</h2> */}
        <Link
          to={{
            pathname: "/editform",
            state: {
              id: this.props.id,
              //url: this.state.url,
              url: this.fakeURLS[id],
              userID: this.props.userID,
            },
            //state: { id: id, url: this.fakeURLS[id] },
          }}
        >
          <button className="Login-button">Add Recipe</button>
        </Link>
        <Link
          to={{
            pathname: "/viewpost",
            //state: { id: this.props.id, url: this.state.url },
            state: {
              id: id,
              url: this.fakeURLS[id],
              userID: this.props.userID,
            },
          }}
        >
          <button className="Login-button">View Post</button>
        </Link>

        <img
          src={this.fakeURLS[id]}
          //src={this.state.url}
          alt="oh no"
          width="500"
          height="500"
        />
      </div>
    );
  }
}

export default Card;
