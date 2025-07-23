package com.narain.portfoliotracker.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.AccessDeniedException; 

import com.narain.portfoliotracker.dto.PorfolioValueWrapper;
import com.narain.portfoliotracker.model.Asset;
import com.narain.portfoliotracker.model.AssetRequest;
import com.narain.portfoliotracker.model.Portfolio;
import com.narain.portfoliotracker.service.PortfolioService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/portfolio")
public class PortfolioController {
    
    private PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        System.out.println("PortfolioController created with PortfolioService: " + portfolioService);
        this.portfolioService = portfolioService;
    }

    @PostMapping("/total")
    public PorfolioValueWrapper getTotalValue(@RequestBody Portfolio portfolio) {
        double total = portfolioService.getTotalPortfolioValue(portfolio);
        return new PorfolioValueWrapper(total);
    }

    @PostMapping("/live")
    public double getLiveValue(@RequestBody Portfolio portfolio) {
        return portfolioService.getPortfolioLiveValue(portfolio);
    }

   @PostMapping("/add-asset/{portfolioId}")
    public ResponseEntity<String> addAsset(@PathVariable UUID portfolioId, @RequestBody Asset asset, Authentication authentication) throws AccessDeniedException {
        String username = authentication.getName();

        try {
            portfolioService.addAssetToPortfolio(username, portfolioId, asset);
            return ResponseEntity.ok("Asset added successfully to portfolio.");
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized to modify this portfolio.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the asset: " + e.getMessage());
        }
    }
    @DeleteMapping("/removed-asset/{ticker}")
    public ResponseEntity<String> removeAsset(@RequestBody Portfolio portfolio, @PathVariable UUID portfolioId, @PathVariable String ticker, Authentication authentication) {
        String username = authentication.getName();
        if (!portfolioService.userOwnsPortfolio(username, portfolioId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorised access to this resource.");
        }

        boolean removed = portfolioService.removeAssetFromPortfolio(portfolio, ticker);
        if (removed) {
            return ResponseEntity.ok("Asset removed successfully from portfolio.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Asset not found in portfolio.");
        }
    }

    @PostMapping("/asset/{ticker}")
    public ResponseEntity<Asset> getAssetByTicker(@RequestBody Portfolio portfolio, @PathVariable String ticker) {
        Asset asset = portfolioService.getAssetByTicker(portfolio, ticker);
        if (asset != null) {
            return ResponseEntity.ok(asset);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/all-assets")
    public ResponseEntity<Portfolio> getAllAssets(@RequestBody Portfolio portfolio) {
        Portfolio responsePortfolio = new Portfolio(portfolio.getPortflioName(), portfolio.getCreationDate(), 
                                                     portfolio.getTotalValue(), portfolio.getBalance(), 
                                                     portfolio.getCurrency());

        for (Asset asset : portfolio.getAllAssets()) {
            responsePortfolio.addAsset(asset);
        }

        return ResponseEntity.ok(responsePortfolio);
    }

    @PostMapping("/asset-type-breakdown")
    public ResponseEntity<String> getAssetTypeBreakdown(@RequestBody Portfolio portfolio) {
        StringBuilder breakdown = new StringBuilder();
        for (String type : portfolio.getAllAssetTypes()) {
            double totalValue = portfolio.getTotalValueByType(type);
            breakdown.append(type).append(": ").append(totalValue).append("\n");
        }
        return ResponseEntity.ok(breakdown.toString());
    }
    
    @PostMapping("/value-by-type")
    public ResponseEntity<Double> getValueByType(@RequestBody AssetRequest request) {
        double value = portfolioService.getPortfolioValueByType(request.getPortfolio(), request.getAsset().getType());
        return ResponseEntity.ok(value);
    }

    @PostMapping("/asset-values-by-type")
    public ResponseEntity<Map<String, Double>> getAssetValuesByType(@RequestBody Portfolio portfolio) {
        return ResponseEntity.ok(portfolioService.getAssetValuesByType(portfolio));
    }

    @PostMapping("/metadata")
    public ResponseEntity<Map<String, Object>> getMetadata(@RequestBody Portfolio portfolio) {
        Map<String, Object> meta = new HashMap<>();
        meta.put("name", portfolio.getPortflioName());
        meta.put("creationDate", portfolio.getCreationDate());
        meta.put("balance", portfolio.getBalance());
        meta.put("currency", portfolio.getCurrency());
        return ResponseEntity.ok(meta);
    }

    @PostMapping("/create")
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody Portfolio portfolio,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Portfolio savedPortfolio = portfolioService.createPortfolioForUser(portfolio, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPortfolio);
    }

    @GetMapping("/my-portfolios")
    public ResponseEntity<List<Portfolio>> getMyPortfolios(Authentication authentication) {
        String username = authentication.getName();
        List<Portfolio> portfolios = portfolioService.getPortfoliosByUsername(username);

        return ResponseEntity.ok(portfolios);
    } 
}
