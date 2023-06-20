package com.booter.repository;

import com.booter.models.Game;
import com.booter.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByCreator(Player creator);
}
