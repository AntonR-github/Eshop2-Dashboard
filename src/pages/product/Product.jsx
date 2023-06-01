import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@mui/icons-material";
import { useLocation, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../constants/requestMethods";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [productStats, setProductStats] = useState([]);
    const [inputs , setInputs] = useState({});
    const dispatch = useDispatch();

    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId));

        const MONTHS = useMemo(
            () => [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ],
            []
        );

        useEffect(() => {
            const getStats = async () => {
                try {
                    const res = await userRequest.get("/orders/income?pid=" + productId);
                    const list = res.data.sort((a, b) => {
                        return a._id - b._id;
                    });
                    list.map((item) =>
                        setProductStats((prev) => [
                            ...prev,
                            { name: MONTHS[item._id - 1], Sales: item.total },
                        ])
                    );
                } catch (err) {
                    console.log(err);
                }
            };
            getStats();
        }, [productId, MONTHS]);

        const handleChange = (e) => {
            setInputs(prev => {
                return {...prev, [e.target.name]: e.target.value }
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            updateProduct(productId, inputs, dispatch);
        };

      
        let inStock;
        if (product.inStock === true) {
            inStock = "Yes";
        } else {
            inStock = "No";
        }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input name='title' type="text" placeholder={product.title} onChange={handleChange} />
                        <label>Product Description</label>
                        <input name='desc' type="text" placeholder={product.desc} onChange={handleChange} />
                        <label>Product Price</label>
                        <input name='price' type="number" placeholder={product.price} onChange={handleChange} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" onChange={handleChange} >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button onClick={handleSubmit} className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
