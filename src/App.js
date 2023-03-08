import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Client/Clients";
import ClientNew from "./pages/Client/ClientNew";
import ClientDetails from "./pages/Client/ClientDetails";
import ClientEdit from "./pages/Client/ClientEdit";
import Products from "./pages/Product/Products";
import ProductNew from "./pages/Product/ProductNew";
import ProductDetails from "./pages/Product/ProductDetails";
import ProductEdit from "./pages/Product/ProductEdit";
import ClientCommunication from "./pages/ClientCommunication/ClientCommunication";
import ClientCommunicationNew from "./pages/ClientCommunication/ClientCommunicationNew";
import ClientCommunicationEdit from "./pages/ClientCommunication/ClientCommunicationEdit";
import ClientProducts from "./pages/ClientProduct/ClientProducts";
import ClientProductNew from "./pages/ClientProduct/ClientProductNew";
import ClientProductDetails from "./pages/ClientProduct/ClientProductDetails";
import ClientProductEdit from "./pages/ClientProduct/ClientProductEdit";
import Sales from "./pages/Sale/Sales";
import SaleNew from "./pages/Sale/SaleNew";
import SaleDetails from "./pages/Sale/SaleDetails";
import SaleEdit from "./pages/Sale/SaleEdit";

const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: "Poppins-Regular",
		},
	},
});

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterMoment}>
					<HashRouter>
						<Routes>
							<Route path="" element={<Layout />}>
								<Route index element={<Dashboard />} />
								<Route path="/klijenti" element={<Clients />} />
								<Route path="/klijenti/novi" element={<ClientNew />} />
								<Route path="/klijent/:id" element={<ClientDetails />} />
								<Route path="/klijent/:id/uredi" element={<ClientEdit />} />
								<Route path="/proizvodi" element={<Products />} />
								<Route path="/proizvodi/novi" element={<ProductNew />} />
								<Route path="/proizvod/:id" element={<ProductDetails />} />
								<Route path="/proizvod/:id/uredi" element={<ProductEdit />} />
								<Route path="/klijent/:id/komunikacija" element={<ClientCommunication />} />
								<Route path="/klijent/:id/komunikacija/nova" element={<ClientCommunicationNew />} />
								<Route path="/klijent/:clientId/komunikacija/:communicationId/uredi" element={<ClientCommunicationEdit />} />
								<Route path="/klijent/:id/proizvodi" element={<ClientProducts />} />
								<Route path="/klijent/:id/proizvodi/novi" element={<ClientProductNew />} />
								<Route path="/klijent/:clientId/proizvod/:productId" element={<ClientProductDetails />} />
								<Route path="/klijent/:clientId/proizvod/:productId/uredi" element={<ClientProductEdit />} />
								<Route path="/prodaje" element={<Sales />} />
								<Route path="/prodaje/nova" element={<SaleNew />} />
								<Route path="/prodaja/:id" element={<SaleDetails />} />
								<Route path="/prodaja/:id/uredi" element={<SaleEdit />} />
							</Route>
						</Routes>
					</HashRouter>
				</LocalizationProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
