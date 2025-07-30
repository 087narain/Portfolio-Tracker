package com.narain.portfoliotracker.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.narain.portfoliotracker.dto.AssetLookupDTO;
import com.narain.portfoliotracker.dto.CreatePortfolio;
import com.narain.portfoliotracker.dto.PorfolioValueWrapper;
import com.narain.portfoliotracker.dto.PortfolioDTOId;
import com.narain.portfoliotracker.model.Asset;
import com.narain.portfoliotracker.model.AssetRequest;
import com.narain.portfoliotracker.model.Portfolio;
import com.narain.portfoliotracker.model.User;
import com.narain.portfoliotracker.repository.PortfolioRepository;
import com.narain.portfoliotracker.service.PortfolioService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/portfolio")
public class PortfolioController {
    
    private PortfolioService portfolioService;
    private PortfolioRepository portfolioRepository;

    public PortfolioController(PortfolioService portfolioService, PortfolioRepository portfolioRepository) {
        System.out.println("PortfolioController created with PortfolioService: " + portfolioService);
        this.portfolioService = portfolioService;
        this.portfolioRepository = portfolioRepository;
    }

    private Portfolio dtoToPortfolio(CreatePortfolio dto, User user) {
        Portfolio portfolio = new Portfolio();
        portfolio.setPortfolioName(dto.getPortfolioName());
        portfolio.setBalance(dto.getBalance());
        portfolio.setCurrency(dto.getCurrency());
        portfolio.setUser(user);

        return portfolio;
    }

    @PostMapping("/total")
    public PorfolioValueWrapper getTotalValue(@RequestBody PortfolioDTOId portfolioDTOId) {
        UUID portfolioId = portfolioDTOId.getPortfolioDTOId();

        Portfolio portfolio = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        double totalValue = portfolioService.getTotalPortfolioValue(portfolio);

        return new PorfolioValueWrapper(totalValue);
    }

    @PostMapping("/live")
    public double getLiveValue(@RequestBody PortfolioDTOId portfolioDTOId) {
        return portfolioService.getPortfolioLiveValue(portfolioRepository.getById(portfolioDTOId.getPortfolioDTOId()));
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
    
    @DeleteMapping("/remove-asset/{portfolioId}/{ticker}")
    public ResponseEntity<String> removeAsset(@PathVariable UUID portfolioId, @PathVariable String ticker, Authentication authentication) {
        String username = authentication.getName();
        if (!portfolioService.userOwnsPortfolio(username, portfolioId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorised access to this resource.");
        }

        Portfolio portfolio = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        boolean removed = portfolioService.removeAssetFromPortfolio(portfolio, ticker);
        if (removed) {
            return ResponseEntity.ok("Asset removed successfully from portfolio.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Asset not found in portfolio.");
        }
    }

    @PostMapping("/asset/{ticker}")
    public ResponseEntity<Asset> getAssetByTicker(@PathVariable AssetLookupDTO dto) {

        UUID id = dto.getId();
        String ticker = dto.getTicker();

        Portfolio portfolio = portfolioService.getPortfolioById(id);
        Asset asset = portfolioService.getAssetByTicker(portfolio, ticker);
        if (asset != null) {
            return ResponseEntity.ok(asset);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/all-assets")
    public ResponseEntity<List<Asset>> getAllAssets(@RequestBody PortfolioDTOId portfolioDTOId) {
        UUID portfolioId = portfolioDTOId.getPortfolioDTOId();

        Portfolio portfolio = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        return ResponseEntity.ok(portfolio.getAllAssets());
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
    public ResponseEntity<Map<String, Double>> getAssetValuesByType(@RequestBody PortfolioDTOId portfolioDTOId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioDTOId.getPortfolioDTOId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));
        
        Map<String, Double> assetValues = portfolioService.getAssetValuesByType(portfolio);

        return ResponseEntity.ok(assetValues);
    }

    @PostMapping("/metadata")
    public ResponseEntity<Map<String, Object>> getMetadata(@RequestBody PortfolioDTOId portfolioDTOId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioDTOId.getPortfolioDTOId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        Map<String, Object> meta = new HashMap<>();
        meta.put("name", portfolio.getPortflioName());
        meta.put("creationDate", portfolio.getCreationDate());
        meta.put("balance", portfolio.getBalance());
        meta.put("currency", portfolio.getCurrency());
        return ResponseEntity.ok(meta);
    }

    @PostMapping("/create")
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody CreatePortfolio createDto, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        User user = portfolioService.getOwnerName(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Portfolio portfolio = dtoToPortfolio(createDto, user);
        Portfolio createdPortfolio = portfolioService.createPortfolioForUser(portfolio, username);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPortfolio);
    }

    @GetMapping("/my-portfolios")
    public ResponseEntity<List<Portfolio>> getMyPortfolios(Authentication authentication) {
        String username = authentication.getName();
        List<Portfolio> portfolios = portfolioService.getPortfoliosByUsername(username);

        return ResponseEntity.ok(portfolios);
    } 

    @PutMapping("/update/{portfolioId}")
    public ResponseEntity<Portfolio> updatePortfolio(@PathVariable UUID portfolioId, 
                                                     @RequestBody CreatePortfolio dto, 
                                                     Authentication authentication) {
        String username = authentication.getName();

        if (!portfolioService.userOwnsPortfolio(username, portfolioId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Portfolio existing = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        existing.setPortfolioName(dto.getPortfolioName());
        existing.setBalance(dto.getBalance());
        existing.setCurrency(dto.getCurrency());

        Portfolio saved = portfolioRepository.save(existing);
        return ResponseEntity.ok(saved);

    }

    @PutMapping("/update-asset/{portfolioId}")
    public ResponseEntity<Portfolio> updateAssetInPortfolio(@PathVariable UUID portfolioId, 
                                                             @RequestBody Asset asset, 
                                                             Authentication authentication) {
        String username = authentication.getName();

        if (!portfolioService.userOwnsPortfolio(username, portfolioId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            Portfolio updatedPortfolio = portfolioService.updateAssetInPortfolio(portfolioId, asset.getTicker(), asset);
            return ResponseEntity.ok(updatedPortfolio);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{portfolioId}")
    public ResponseEntity<String> deletePortfolio(@PathVariable UUID portfolioId, 
                                                   Authentication authentication) {
        String username = authentication.getName();

        if (!portfolioService.userOwnsPortfolio(username, portfolioId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized to delete this portfolio.");
        }

        try {
            portfolioService.deletePortfolio(portfolioId);
            return ResponseEntity.ok("Portfolio deleted successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Portfolio not found.");
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorised to delete this portfolio.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the portfolio: " + e.getMessage());
        }
    }
}
